import viLocale from '@fullcalendar/core/locales/vi'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import '~/components/calendar/Calendar.css'
import FullCalendar from '@fullcalendar/react'

interface GardenCalendarProps {
  events: Array<object>

  // onDatesChange: (viewType: string, startDate: Date, endDate: Date) => void
}

const Calendar: React.FC<GardenCalendarProps> = ({ events = [] /* , onDatesChange */ }) => {
  // const handleDatesSet = (arg: DatesSetArg) => {
  //   const viewType = arg.view.type
  //   const startDate = arg.start
  //   const endDate = arg.end
  //   onDatesChange(viewType, startDate, endDate)
  // }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      }}
      initialView={'dayGridMonth'}
      editable={false}
      selectable={false}
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
      displayEventTime={true}
      displayEventEnd={true}
      allDaySlot={false}
      nowIndicator
      slotMinTime={'7:00:00'}
      slotMaxTime={'17:30:00'}
      slotEventOverlap={false}
      expandRows={true}
      // datesSet={handleDatesSet}
    />
  )
}

export default Calendar
