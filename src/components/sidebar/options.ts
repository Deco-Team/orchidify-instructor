import {
  BarChart,
  Event,
  CurrencyExchange,
  Home,
  MenuBook,
  NoteAlt,
  AutoAwesomeMotion,
  Class
} from '@mui/icons-material'
import { protectedRoute } from '~/routes/routes'

export const options = [
  { id: 1, text: 'Trang chủ', link: protectedRoute.dashboard.path, Icon: Home },
  { id: 2, text: 'Khóa học', link: protectedRoute.courseList.path, Icon: MenuBook },
  { id: 3, text: 'Combo khóa học', link: protectedRoute.dashboard.path, Icon: AutoAwesomeMotion },
  { id: 4, text: 'Lớp học', link: protectedRoute.dashboard.path, Icon: Class },
  { id: 5, text: 'Yêu cầu lớp học', link: protectedRoute.classRequestList.path, Icon: NoteAlt },
  { id: 6, text: 'Lịch dạy', link: protectedRoute.teachingTimesheet.path, Icon: Event },
  { id: 7, text: 'Yêu cầu rút tiền', link: protectedRoute.dashboard.path, Icon: CurrencyExchange },
  { id: 8, text: 'Thống kê', link: protectedRoute.dashboard.path, Icon: BarChart }
]
