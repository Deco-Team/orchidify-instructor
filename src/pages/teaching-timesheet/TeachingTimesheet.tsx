import FullCalendar from '@fullcalendar/react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Calendar from '~/components/calendar/Calendar'
import PageHeader from '~/components/header/PageHeader'
import { CalendarType } from '~/global/constants'
import { useTimesheetApi } from '~/hooks/api/useTimesheetApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'

const TeachingTimesheet = () => {
  const navigate = useNavigate()
  const { getTeachingTimesheet } = useTimesheetApi()
  const [searchParams, setSearchParams] = useSearchParams()
  const calendarRef = useRef<FullCalendar | null>(null)

  const [displayEventTime, setDisplayEventTime] = useState(true)
  const [eventData, setEventData] = useState<
    {
      id: string
      title: string
      start: string
      end: string
      display: string
      backgroundColor: string
      classNames: string
    }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)

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
        title: slot.metadata
          ? `${slot.hasTakenAttendance ? '' : viewType === 'dayGridMonth' ? '(*) ' : '(Chưa điểm danh) '}${slot.metadata?.code} - ${slot.metadata?.title}`
          : 'Không có dữ liệu',
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
                : 'var(--fc-fourth-event-text-color',
        classNames: viewType === 'dayGridMonth' ? `slot${slot.slotNumber}` : ''
      }))

      setEventData(transformedEventData)
    }

    if (apiError) {
      notifyError(apiError.message)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    const viewType = searchParams.get('viewType') || 'timeGridWeek'
    const startDate = searchParams.get('startDate') || new Date().toISOString().split('T')[0]

    fetchTimesheetData(viewType, startDate)
    calendarRef.current?.getApi().changeView(viewType, startDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handleDatesChange = (viewType: string, startDate: string) => {
    setSearchParams({ viewType, startDate }, { replace: true })
    fetchTimesheetData(viewType, startDate)
  }

  const handleEventClick = (slotId: string) => {
    navigate(protectedRoute.slotDetail.path.replace(':slotId', slotId))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <PageHeader title='Lịch dạy' />
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
          <span style={{ fontWeight: 600, color: 'var(--fc-fourth-event-text-color)' }}>Tiết 4</span>: 15:30 - 17:30
        </li>
        <li>(*) Chưa điểm danh</li>
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <Calendar
          calendarRef={calendarRef}
          events={eventData}
          showNonCurrentDates={false}
          displayEventTime={displayEventTime}
          onDatesChange={handleDatesChange}
          eventClick={true}
          onEventClick={handleEventClick}
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
  )
}

export default TeachingTimesheet
