import { BarChart, CalendarMonth, CurrencyExchange, Home, MenuBook, NoteAlt } from '@mui/icons-material'

export const options = [
  { id: 1, text: 'Trang chủ', link: 'home', Icon: Home },
  { id: 2, text: 'Khóa học', link: 'courses', Icon: MenuBook },
  { id: 3, text: 'Yêu cầu khóa học', link: 'courseReqs', Icon: NoteAlt },
  { id: 4, text: 'Lịch dạy', link: 'timesheet', Icon: CalendarMonth },
  { id: 5, text: 'Yêu cầu rút tiền', link: 'withdrawReqs', Icon: CurrencyExchange },
  { id: 6, text: 'Thống kê', link: 'report', Icon: BarChart }
]
