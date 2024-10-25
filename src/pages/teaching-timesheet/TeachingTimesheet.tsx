import { Box, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from '~/components/calendar/Calendar'
import PageHeader from '~/components/header/PageHeader'
import { CalendarType } from '~/global/constants'
import { useTimesheetApi } from '~/hooks/api/useTimesheetApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'

const TeachingTimesheet = () => {
  const navigate = useNavigate()
  const { getTeachingTimesheet } = useTimesheetApi()

  const [displayEventTime, setDisplayEventTime] = useState(true)
  const [eventData, setEventData] = useState<
    { id: string; title: string; start: string; end: string; display: string; backgroundColor: string }[]
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

  const handleDatesChange = async (viewType: string, startDate: string) => {
    const apiViewType = mapViewTypeToApi(viewType)
    setDisplayEventTime(apiViewType === CalendarType.WEEK)

    setIsLoading(true)

    const { data: teachingTimesheet, error: apiError } = await getTeachingTimesheet(startDate, apiViewType)

    if (teachingTimesheet) {
      const transformedEventData = teachingTimesheet.map((slot) => ({
        id: slot._id,
        title: slot.metadata ? `${slot.metadata?.code} - ${slot.metadata?.title}` : 'Không có dữ liệu',
        start: slot.start.toString(),
        end: slot.end.toString(),
        display: 'block',
        backgroundColor: '#2ec2b34c'
      }))

      setEventData(transformedEventData)
    }

    if (apiError) {
      notifyError(apiError.message)
    }

    setIsLoading(false)
  }

  const handleEventClick = (slotId: string) => {
    navigate(protectedRoute.slotDetail.path.replace(':slotId', slotId))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <PageHeader title='Lịch dạy' />
      <Box sx={{ position: 'relative' }}>
        <Calendar
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
              backgroundColor: '#ffffff7f',
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
