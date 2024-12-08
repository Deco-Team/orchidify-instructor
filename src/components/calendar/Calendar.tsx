import viLocale from '@fullcalendar/core/locales/vi'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import '~/components/calendar/Calendar.css'
import FullCalendar from '@fullcalendar/react'
import { useMemo } from 'react'
import { DatesSetArg, EventClickArg } from '@fullcalendar/core/index.js'

interface GardenCalendarProps {
  events: Array<object>
  calendarRef?: React.RefObject<FullCalendar>
  showNonCurrentDates?: boolean
  displayEventTime?: boolean
  onDatesChange?: (viewType: string, startDate: string) => void
  eventClick?: boolean
  onEventClick?: (slotId: string) => void
}

const Calendar: React.FC<GardenCalendarProps> = ({
  events = [],
  calendarRef,
  showNonCurrentDates = true,
  displayEventTime = true,
  onDatesChange,
  eventClick = false,
  onEventClick
}) => {
  const validRange = useMemo(() => {
    const today = new Date()
    const startDate = `${today.getFullYear() - 2}-${today.getMonth() + 1}-${today.getDate()}`
    const endDate = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`

    return {
      start: startDate,
      end: endDate
    }
  }, [])

  const handleDatesSet = (arg: DatesSetArg) => {
    const viewType = arg.view.type
    const startDate = arg.startStr
    onDatesChange?.(viewType, startDate)
  }

  const handleEventClick = (arg: EventClickArg) => {
    if (eventClick) onEventClick?.(arg.event.id)
  }

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      }}
      initialView={'dayGridMonth'}
      validRange={validRange}
      editable={false}
      selectable={false}
      eventClick={handleEventClick}
      weekends={true}
      events={events}
      locale={viLocale}
      height={1000}
      dayMaxEvents={true}
      // aspectRatio={2}
      titleFormat={{
        year: 'numeric',
        month: '2-digit'
      }}
      eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit'
      }}
      showNonCurrentDates={showNonCurrentDates}
      fixedWeekCount={false}
      displayEventTime={displayEventTime}
      displayEventEnd={true}
      allDaySlot={false}
      nowIndicator
      slotMinTime={'7:00:00'}
      slotMaxTime={'18:00:00'}
      slotEventOverlap={false}
      expandRows={true}
      datesSet={handleDatesSet}
      dateClick={(arg) => {
        if (arg.view.type === 'dayGridMonth') calendarRef?.current?.getApi().changeView('timeGridWeek', arg.dateStr)
      }}
    />
  )
}

export default Calendar
