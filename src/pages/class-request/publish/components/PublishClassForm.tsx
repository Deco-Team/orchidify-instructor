import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { HeaderWrapper, Line, StyledForm } from './PublishClassForm.styled'
import {
  ONE_MONTH_ADDITIONAL,
  PublishClasDto,
  publishClassSchema,
  THREE_MONTH_ADDITIONAL
} from '~/data/class-request/publish-class.dto'
import { useForm } from 'react-hook-form'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import ControlledSelect from '~/components/form/ControlledSelect'
import Calendar from '~/components/calendar/Calendar'
import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SlotNumber, Weekday } from '~/global/constants'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { useRequestApi } from '~/hooks/api/useRequestApi'
import { APP_MESSAGE } from '~/global/app-message'

interface PublishClassFormProps {
  courseId: string | undefined
}

interface SelectedSlotEvent {
  id: string
  start: string | Date
  end: string | Date
  display: string
  backgroundColor: string
  textColor?: string
}

const weekdayMapping = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 0
} as Record<string, number>

const generateAllDayEvents = (startDate: string, duration: number, weekdays: string[]): SelectedSlotEvent[] => {
  const events = [] as SelectedSlotEvent[]
  const start = new Date(startDate)

  for (let week = 0; week < duration; week++) {
    weekdays.forEach((weekday) => {
      const eventDate = new Date(start)
      const dayOffset = weekdayMapping[weekday] - start.getDay()
      eventDate.setDate(start.getDate() + 7 * week + dayOffset)

      if (eventDate >= start) {
        const formattedDate = eventDate.toISOString().split('T')[0]

        events.push({
          id: `${formattedDate}-${weekday}`,
          start: formattedDate,
          end: formattedDate,
          display: 'background',
          backgroundColor: '#2ec2b34c'
          // textColor: '#0ea5e9'
        })
      }
    })
  }

  return events
}

const slotTimeRanges = {
  1: { slotStart: '07:00', slotEnd: '09:00' },
  2: { slotStart: '09:30', slotEnd: '11:30' },
  3: { slotStart: '12:30', slotEnd: '14:30' },
  4: { slotStart: '15:00', slotEnd: '17:00' }
} as Record<string, { slotStart: string; slotEnd: string }>

const updateEventTimesWithSlots = (events: SelectedSlotEvent[], slotNumbers: SlotNumber[]) => {
  const updatedEvents: SelectedSlotEvent[] = []

  slotNumbers.forEach((slotNumber) => {
    const { slotStart, slotEnd } = slotTimeRanges[slotNumber]

    events.forEach((event) => {
      const startDate = new Date(event.start)
      const endDate = new Date(event.start)

      const [startHour, startMinute] = slotStart.split(':').map(Number)
      const [endHour, endMinute] = slotEnd.split(':').map(Number)

      startDate.setHours(startHour, startMinute, 0)
      endDate.setHours(endHour, endMinute, 0)

      updatedEvents.push({
        ...event,
        id: `${event.id}-slot-${slotNumber}`,
        start: startDate,
        end: endDate,
        display: 'block'
      })
    })
  })

  return updatedEvents
}

const defaultFormValues = {
  description: '',
  startDate: '',
  duration: 0,
  weekdays: [],
  slotNumbers: []
}

const PublishClassForm = ({ courseId }: PublishClassFormProps) => {
  const { getAvailableTime, createPublishClassRequest } = useRequestApi()

  const [slotNumbersData, setSlotNumbersData] = useState<{ name: string; value: SlotNumber }[]>([])
  const [events, setEvents] = useState<SelectedSlotEvent[]>([])

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    setValue,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<PublishClasDto>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(publishClassSchema),
    mode: 'onTouched'
  })

  const formValues = watch()

  useEffect(() => {
    const { startDate, duration, weekdays, slotNumbers } = formValues

    if (startDate && duration > 0 && weekdays.length > 0) {
      const allDayEvents = generateAllDayEvents(startDate, duration, weekdays)
      let updatedEvents = allDayEvents

      if (slotNumbers.length > 0) {
        updatedEvents = updateEventTimesWithSlots(allDayEvents, slotNumbers)
      }

      setEvents(updatedEvents)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.startDate, formValues.duration, formValues.weekdays.length, formValues.slotNumbers.length])

  const getSlotNumbers = async () => {
    setSlotNumbersData([])
    setValue('slotNumbers', [])

    if (!getValues('startDate') || getValues('duration') <= 0 || getValues('weekdays').length === 0) return
    else if (errors.startDate || errors.duration || errors.weekdays) {
      setError('slotNumbers', { message: APP_MESSAGE.LOAD_DATA_FAILED('dữ liệu tiết học') })
      return
    }

    const { data: slotNumbers, error: error } = await getAvailableTime(
      getValues('startDate'),
      getValues('duration'),
      getValues('weekdays')
    )
    setSlotNumbersData(
      slotNumbers?.slotNumbers.map((slotNumber) => ({ name: `${slotNumber}`, value: slotNumber })) || []
    )

    if (error) {
      notifyError(error.message)
    }
  }

  const onSubmit = handleSubmit(async (formData) => {
    notifyLoading()

    const { data, error } = await createPublishClassRequest({
      ...formData,
      startDate: new Date(formData.startDate),
      courseId: courseId || '',
      slotNumbers: formData.slotNumbers.map((slotNumber) => slotNumber)
    })
    if (error) {
      notifyError(error.message)
      return
    }
    if (data) {
      localStorage.removeItem('savedCourse')
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Gửi yêu cầu mở'))
      // navigate(protectedRoute.requestDetail.path.replace(':id', course?._id || ''))
    }
  })

  return (
    <StyledForm onSubmit={onSubmit}>
      <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: 3, gap: 2.5, width: '100%' }}>
        <HeaderWrapper>
          <Typography variant='h5' fontWeight={'bold'}>
            Yêu cầu mở
          </Typography>
          <Line />
        </HeaderWrapper>
        <Grid container columnSpacing={4} rowSpacing={'20px'}>
          <Grid item xs={12}>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: 'description', control: control }}
              label='Mô tả yêu cầu'
              placeholder='Nhập mô tả yêu cầu'
              multiline
              minRows={4}
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: 'startDate', control: control }}
              label='Ngày bắt đầu'
              description='Ngày bắt đầu tối thiểu là 1 tháng sau và tối đa là 3 tháng'
              type='date'
              inputProps={{
                min: new Date(ONE_MONTH_ADDITIONAL).toISOString().split('T')[0],

                max: new Date(THREE_MONTH_ADDITIONAL).toISOString().split('T')[0]
              }}
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledOutlinedInput
              size='small'
              controller={{ name: 'duration', control: control }}
              label='Thời lượng'
              description='Thời lượng tối thiểu là 1 tuần và tối đa là 12 tuần'
              type='number'
              inputProps={{
                min: 0,
                max: 12
              }}
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledSelect
              size='small'
              controller={{ name: 'weekdays', control: control }}
              label='Ngày học trong tuần'
              labelId='weekdays'
              items={[
                { name: 'T2', value: Weekday.MONDAY },
                { name: 'T3', value: Weekday.TUESDAY },
                { name: 'T4', value: Weekday.WEDNESDAY },
                { name: 'T5', value: Weekday.THURSDAY },
                { name: 'T6', value: Weekday.FRIDAY },
                { name: 'T7', value: Weekday.SATURDAY },
                { name: 'CN', value: Weekday.SUNDAY }
              ]}
              displayEmpty
              placeholder='Chọn ngày học'
              multiple
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledSelect
              size='small'
              controller={{ name: 'slotNumbers', control: control }}
              label='Tiết học'
              labelId='slotNumbers'
              items={slotNumbersData}
              displayEmpty
              onOpen={getSlotNumbers}
              placeholder='Chọn tiết học'
              multiple
              renderChips={false}
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant='caption'>
          <span style={{ textDecoration: 'underline' }}>Chú thích:</span> Tiết 1: 7h - 9h, tiết 2: 9h30 - 11h30, tiết 3:
          12h30 - 14h30, tiết 4: 15h - 17h
        </Typography>
        <Calendar events={events} />
      </Box>
      <Button sx={{ maxWidth: 'fit-content' }} disabled={isSubmitting || Object.keys(errors).length > 0} type='submit'>
        Gửi yêu cầu mở
      </Button>
    </StyledForm>
  )
}

export default PublishClassForm
