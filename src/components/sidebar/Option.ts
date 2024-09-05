import { BarChart, CalendarMonth, CurrencyExchange, Home, MenuBook, NoteAlt } from '@mui/icons-material'

export const Options = [
  { id: 1, text: 'Trang chủ', link: 'home', icon: Home },
  { id: 2, text: 'Khóa học', link: 'courses', icon: MenuBook },
  { id: 3, text: 'Yêu cầu khóa học', link: 'courseReqs', icon: NoteAlt },
  { id: 4, text: 'Lịch dạy', link: 'timesheet', icon: CalendarMonth },
  { id: 5, text: 'Yêu cầu rút tiền', link: 'withdrawReqs', icon: CurrencyExchange },
  { id: 6, text: 'Thống kê', link: 'report', icon: BarChart }
]
