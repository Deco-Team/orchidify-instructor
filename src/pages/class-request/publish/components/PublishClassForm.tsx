import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { StyledForm } from './PublishClassForm.styled'
import { PublishClasDto, publishClassSchema } from '~/data/class-request/publish-class.dto'
import { useForm } from 'react-hook-form'
import Calendar from '~/components/calendar/Calendar'
import { useState, useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarType, SlotNumber, Weekday } from '~/global/constants'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { useRequestApi } from '~/hooks/api/useRequestApi'
import { APP_MESSAGE } from '~/global/app-message'
import { useNavigate } from 'react-router-dom'
import { convertStringToArray } from '~/utils/format'
import FullCalendar from '@fullcalendar/react'
import PublishFormFields from './PublishFormFields'
import { useTimesheetApi } from '~/hooks/api/useTimesheetApi'

interface PublishClassFormProps {
  courseId: string
  duration: number
}

interface SelectedSlotEvent {
  id: string
  title: string
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
          title: 'Đang chọn',
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
      title: 'Đang chọn - Tiết ' + slotNumber,
      start: startDate,
      end: endDate,
      display: 'block',
      backgroundColor:
        slotNumber === 1
          ? 'var(--fc-first-event-bg-color)'
          : slotNumber === 2
            ? 'var(--fc-second-event-bg-color)'
            : slotNumber === 3
              ? 'var(--fc-third-event-bg-color)'
              : 'var(--fc-fourth-event-bg-color)',
      textColor:
        slotNumber === 1
          ? 'var(--fc-first-event-text-color)'
          : slotNumber === 2
            ? 'var(--fc-second-event-text-color)'
            : slotNumber === 3
              ? 'var(--fc-third-event-text-color)'
              : 'var(--fc-fourth-event-text-color'
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
  const { getTeachingTimesheet } = useTimesheetApi()

  const calendarRef = useRef<FullCalendar | null>(null)

  const [oldData, setOldData] = useState({ startDate: '', weekdaysString: '' })
  const [slotNumbersData, setSlotNumbersData] = useState<{ name: string; value: SlotNumber }[]>([])
  const [events, setEvents] = useState<SelectedSlotEvent[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [displayEventTime, setDisplayEventTime] = useState(true)

  const mapViewTypeToApi = (viewType: string) => {
    switch (viewType) {
      case 'dayGridMonth':
        return CalendarType.MONTH
      case 'timeGridWeek':
        return CalendarType.WEEK
      default:
        return CalendarType.MONTH
    }
  }

  const fetchTimesheetData = async (viewType: string, startDate: string) => {
    const apiViewType = mapViewTypeToApi(viewType)
    setDisplayEventTime(apiViewType === CalendarType.WEEK)

    setIsLoading(true)

    const { data: teachingTimesheet, error: apiError } = await getTeachingTimesheet(startDate, apiViewType)

    if (teachingTimesheet) {
      const transformedEventData = teachingTimesheet.map((slot) => ({
        id: slot._id,
        title: apiViewType === CalendarType.WEEK ? '' : 'Tiết ' + slot.slotNumber,
        start: slot.start.toString(),
        end: slot.end.toString(),
        display: 'block',
        backgroundColor:
          slot.slotNumber === 1
            ? 'var(--fc-first-event-bg-color)'
            : slot.slotNumber === 2
              ? 'var(--fc-second-event-bg-color)'
              : slot.slotNumber === 3
                ? 'var(--fc-third-event-bg-color)'
                : 'var(--fc-fourth-event-bg-color)',
        textColor:
          slot.slotNumber === 1
            ? 'var(--fc-first-event-text-color)'
            : slot.slotNumber === 2
              ? 'var(--fc-second-event-text-color)'
              : slot.slotNumber === 3
                ? 'var(--fc-third-event-text-color)'
                : 'var(--fc-fourth-event-text-color'
      }))

      setEvents((prev) => {
        const newData = transformedEventData

        // Create a Map to store events by a unique identifier (e.g., id)
        const eventMap = new Map()

        // Add existing events to the map
        prev.forEach((event) => eventMap.set(event.id, event))

        // Add new events to the map, overwriting duplicates
        newData.forEach((event) => eventMap.set(event.id, event))

        // Convert the Map back to an array
        return Array.from(eventMap.values())
      })
    }

    if (apiError) {
      notifyError(apiError.message)
    }

    setIsLoading(false)
  }

  const handleDatesChange = (viewType: string, startDate: string) => {
    fetchTimesheetData(viewType, startDate)
  }

  const {
    handleSubmit,
    control,
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
    setValue('slotNumber', SlotNumber.NONE)
  }, [startDate, weekdaysString, setValue])

  useEffect(() => {
    if (startDate) {
      const weekdays = new Date(startDate).getDay() as keyof typeof weekdayMapping
      const weekdayMapping = {
        1: [Weekday.MONDAY, Weekday.THURSDAY],
        2: [Weekday.TUESDAY, Weekday.FRIDAY],
        3: [Weekday.WEDNESDAY, Weekday.SATURDAY],
        4: [Weekday.MONDAY, Weekday.THURSDAY],
        5: [Weekday.TUESDAY, Weekday.FRIDAY],
        6: [Weekday.WEDNESDAY, Weekday.SATURDAY]
      }
      setValue('weekdaysString', (weekdayMapping[weekdays] || []).toString())
    }

    if (startDate && duration && weekdaysString) {
      const allDayEvents = generateAllDayEvents(startDate, duration, weekdaysString)

      const updatedEvents = slotNumber > 0 ? updateEventTimesWithSlots(allDayEvents, slotNumber) : allDayEvents

      updatedEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

      setEvents(updatedEvents)

      if (updatedEvents.length > 0) {
        calendarRef.current?.getApi().gotoDate(new Date(updatedEvents[0].start))
      }
    }
  }, [startDate, duration, slotNumber, setValue, weekdaysString])

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
      navigate(-1)
    }
  })

  return (
    <StyledForm onSubmit={onSubmit}>
      <PublishFormFields
        control={control}
        formValues={formValues}
        duration={duration}
        slotNumbersData={slotNumbersData}
        getSlotNumbers={getSlotNumbers}
      />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant='body2'>
          <span style={{ textDecoration: 'underline' }}>Chú thích:</span>
          <li>
            <span style={{ fontWeight: 600, color: 'var(--fc-first-event-text-color)' }}>Tiết 1</span>: 7:00 - 9:00
          </li>
          <li>
            <span style={{ fontWeight: 600, color: 'var(--fc-second-event-text-color)' }}>Tiết 2</span>: 9:30 - 11:30
          </li>
          <li>
            <span style={{ fontWeight: 600, color: 'var(--fc-third-event-text-color)' }}>Tiết 3</span>: 13:00 - 15:00
          </li>
          <li>
            <span style={{ fontWeight: 600, color: 'var(--fc-fourth-event-text-color)' }}>Tiết 4</span>: 15:30 - 1:30
          </li>
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <Calendar
            events={events}
            calendarRef={calendarRef}
            onDatesChange={handleDatesChange}
            displayEventTime={displayEventTime}
            showNonCurrentDates={false}
          />
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                backgroundColor: '#ffffffb2',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1
              }}
              justifyContent='center'
              alignItems='center'
            >
              <CircularProgress size={80} />
            </Box>
          )}
        </Box>
      </Box>
      <Button sx={{ maxWidth: 'fit-content' }} disabled={isSubmitting || Object.keys(errors).length > 0} type='submit'>
        Gửi yêu cầu mở
      </Button>
    </StyledForm>
  )
}

export default PublishClassForm
