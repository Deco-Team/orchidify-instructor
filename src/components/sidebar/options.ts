import { BackupTable, BarChart, CalendarMonth, CurrencyExchange, Home, MenuBook, NoteAlt } from '@mui/icons-material'
import { protectedRoute } from '~/routes/routes'

export const options = [
  { id: 1, text: 'Trang chủ', link: protectedRoute.dashboard.path, Icon: Home },
  { id: 2, text: 'Mẫu khóa học', link: protectedRoute.courseTemplateList.path, Icon: BackupTable },
  { id: 3, text: 'Khóa học', link: protectedRoute.course.path, Icon: MenuBook },
  { id: 4, text: 'Yêu cầu khóa học', link: protectedRoute.dashboard.path, Icon: NoteAlt },
  { id: 5, text: 'Lịch dạy', link: protectedRoute.dashboard.path, Icon: CalendarMonth },
  { id: 6, text: 'Yêu cầu rút tiền', link: protectedRoute.dashboard.path, Icon: CurrencyExchange },
  { id: 7, text: 'Thống kê', link: protectedRoute.dashboard.path, Icon: BarChart }
]
