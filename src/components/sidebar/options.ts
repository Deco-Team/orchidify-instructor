import { Home, Book, AutoAwesomeMotion, Event } from '@mui/icons-material'
import { protectedRoute } from '~/routes/routes'
import CourseIcon from '../icons/Course'
import ClassRequestIcon from '../icons/ClassRequest'
import PayoutRequestIcon from '../icons/PayoutRequest'
import StatisticIcon from '../icons/Statistic'

export const options = [
  { id: 1, text: 'Trang chủ', link: protectedRoute.dashboard.path, Icon: Home },
  { id: 2, text: 'Khóa học', link: protectedRoute.courseList.path, Icon: CourseIcon },
  { id: 3, text: 'Combo khóa học', link: protectedRoute.dashboard.path, Icon: AutoAwesomeMotion },
  { id: 4, text: 'Lớp học', link: protectedRoute.dashboard.path, Icon: Book },
  { id: 5, text: 'Yêu cầu lớp học', link: protectedRoute.dashboard.path, Icon: ClassRequestIcon },
  { id: 6, text: 'Lịch dạy', link: protectedRoute.dashboard.path, Icon: Event },
  { id: 7, text: 'Yêu cầu rút tiền', link: protectedRoute.dashboard.path, Icon: PayoutRequestIcon },
  { id: 8, text: 'Thống kê', link: protectedRoute.dashboard.path, Icon: StatisticIcon }
]
