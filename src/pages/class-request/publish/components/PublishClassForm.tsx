import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material'
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
import { useState, useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SlotNumber, Weekday } from '~/global/constants'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { useRequestApi } from '~/hooks/api/useRequestApi'
import { APP_MESSAGE } from '~/global/app-message'
import { protectedRoute } from '~/routes/routes'
import { useNavigate } from 'react-router-dom'
import { convertStringToArray } from '~/utils/format'
import FullCalendar from '@fullcalendar/react'

interface PublishClassFormProps {
  courseId: string
  duration: number
}

interface SelectedSlotEvent {
  id: string
  start: string | Date
  end: string | Date
  display: string
  backgroundColor: string
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

const generateAllDayEvents = (startDate: string, duration: number, weekdaysString: string): SelectedSlotEvent[] => {
  const events = [] as SelectedSlotEvent[]
  const start = new Date(startDate)
  const weekdays = convertStringToArray(weekdaysString) as Weekday[]

  let totalEvents = 0

  for (let week = 0; totalEvents < duration * weekdays.length; week++) {
    weekdays.forEach((weekday) => {
      const eventDate = new Date(start)
      const dayOffset = weekdayMapping[weekday] - start.getDay()
      const adjustedDayOffset = dayOffset >= 0 ? dayOffset : dayOffset + 7
      eventDate.setDate(start.getDate() + 7 * week + adjustedDayOffset)
      if (eventDate >= start && totalEvents < duration * weekdays.length) {
        const formattedDate = eventDate.toISOString().split('T')[0]

        events.push({
          id: `${formattedDate}-${weekday}`,
          start: formattedDate,
          end: formattedDate,
          display: 'background',
          backgroundColor: '#2ec2b34c'
        })

        totalEvents++
      }
    })
  }

  return events
}

const slotTimeRanges = {
  1: { slotStart: '07:00', slotEnd: '09:00' },
  2: { slotStart: '09:30', slotEnd: '11:30' },
  3: { slotStart: '13:00', slotEnd: '15:00' },
  4: { slotStart: '15:30', slotEnd: '17:30' }
} as Record<string, { slotStart: string; slotEnd: string }>

const updateEventTimesWithSlots = (events: SelectedSlotEvent[], slotNumber: SlotNumber) => {
  const updatedEvents: SelectedSlotEvent[] = []

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

  return updatedEvents
}

const defaultFormValues = {
  description: '',
  startDate: '',
  weekdaysString: '',
  slotNumber: 0
}
const PublishClassForm = ({ courseId, duration }: PublishClassFormProps) => {
  const navigate = useNavigate()
  const { getAvailableTime, createPublishClassRequest } = useRequestApi()

  const calendarRef = useRef<FullCalendar | null>(null)

  const [oldData, setOldData] = useState({ startDate: '', weekdaysString: '' })
  const [slotNumbersData, setSlotNumbersData] = useState<{ name: string; value: SlotNumber }[]>([])
  const [events, setEvents] = useState<SelectedSlotEvent[]>([])

  const {
    handleSubmit,
    control,
    // getValues,
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
  const { startDate, weekdaysString, slotNumber } = formValues

  useEffect(() => {
    // setSlotNumbersData([])
    setValue('slotNumber', SlotNumber.NONE)
  }, [startDate, weekdaysString, setValue])

  useEffect(() => {
    if (startDate && duration && weekdaysString) {
      const allDayEvents = generateAllDayEvents(startDate, duration, weekdaysString)

      const updatedEvents = slotNumber > 0 ? updateEventTimesWithSlots(allDayEvents, slotNumber) : allDayEvents

      updatedEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

      setEvents(updatedEvents)

      if (updatedEvents.length > 0) {
        calendarRef.current?.getApi().gotoDate(new Date(updatedEvents[0].start))
      }
    }
  }, [startDate, duration, weekdaysString, slotNumber])

  const getSlotNumbers = async () => {
    if (oldData.startDate === startDate && oldData.weekdaysString === weekdaysString) return

    setOldData({ startDate, weekdaysString })

    if (errors.startDate || errors.weekdaysString || !startDate || !weekdaysString) {
      setSlotNumbersData([])
      setValue('slotNumber', SlotNumber.NONE)
      setError('slotNumber', { message: APP_MESSAGE.LOAD_DATA_FAILED('dữ liệu tiết học') })
      return
    }

    const { data: slotNumbers, error } = await getAvailableTime(
      startDate,
      duration || 0,
      convertStringToArray(weekdaysString) as Weekday[]
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
      slotNumbers: [formData.slotNumber],
      weekdays: convertStringToArray(formData.weekdaysString) as Weekday[]
    })
    if (error) {
      notifyError(error.message)
      return
    }
    if (data) {
      notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Gửi yêu cầu mở'))
      navigate(protectedRoute.courseDetail.path.replace(':id', courseId || ''))
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
                min: new Date(ONE_MONTH_ADDITIONAL).toLocaleString('sv').split(' ')[0],

                max: new Date(THREE_MONTH_ADDITIONAL).toLocaleString('sv').split(' ')[0]
              }}
              fullWidth
              sx={{ gap: 1 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <InputLabel sx={{ color: '#000000' }}>Thời lượng</InputLabel>
                <FormHelperText>Thời lượng tối thiểu là 1 tuần và tối đa là 12 tuần</FormHelperText>
              </Box>
              <Box>
                <OutlinedInput size='small' value={duration} fullWidth disabled />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <ControlledSelect
              size='small'
              controller={{ name: 'weekdaysString', control: control }}
              label='Ngày học trong tuần'
              labelId='weekdaysString'
              items={[
                { name: 'T2, T5', value: [Weekday.MONDAY, Weekday.THURSDAY].toString() },
                { name: 'T3, T6', value: [Weekday.TUESDAY, Weekday.FRIDAY].toString() },
                { name: 'T4, T7', value: [Weekday.WEDNESDAY, Weekday.SATURDAY].toString() }
              ]}
              displayEmpty
              placeholder='Chọn ngày học'
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6}>
            <ControlledSelect
              size='small'
              controller={{ name: 'slotNumber', control: control }}
              label='Tiết học'
              labelId='slotNumber'
              items={slotNumbersData}
              displayEmpty
              onOpen={getSlotNumbers}
              placeholder='Chọn tiết học'
              renderChips={false}
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant='caption'>
          <span style={{ textDecoration: 'underline' }}>Chú thích</span>: Tiết 1: 7h - 9h, tiết 2: 9h30 - 11h30, tiết 3:
          13h - 15h, tiết 4: 15h30 - 17h30
        </Typography>
        <Calendar events={events} calendarRef={calendarRef} />
      </Box>
      <Button sx={{ maxWidth: 'fit-content' }} disabled={isSubmitting || Object.keys(errors).length > 0} type='submit'>
        Gửi yêu cầu mở
      </Button>
    </StyledForm>
  )
}

export default PublishClassForm
