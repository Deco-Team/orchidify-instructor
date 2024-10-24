import { lazy } from 'react'

const Home = lazy(() => import('~/pages/Home'))
const Login = lazy(() => import('~/pages/login/Login'))
const Profile = lazy(() => import('~/pages/profile/Profile'))
const EditProfile = lazy(() => import('~/pages/profile/edit-profile/EditProfile'))
const CourseList = lazy(() => import('~/pages/course/CourseList'))
const CourseDetail = lazy(() => import('~/pages/course/detail/CourseDetail'))
const CreateCourse = lazy(() => import('~/pages/course/create/CreateCourse'))
const UpdateCourse = lazy(() => import('~/pages/course/update/UpdateCourse'))
const CourseSessionDetail = lazy(() => import('~/pages/course/detail/session-detail/SessionDetail'))
const PublishClass = lazy(() => import('~/pages/class-request/publish/PublishClass'))
const ClassRequestList = lazy(() => import('~/pages/class-request/ClassRequestList'))
const ClassRequestDetail = lazy(() => import('~/pages/class-request/detail/ClassRequestDetail'))
const ViewClassList = lazy(() => import('~/pages/class/ViewClassList'))
const ViewClassDetail = lazy(() => import('~/pages/class/detail/ViewClassDetail'))
const ClassSessionDetail = lazy(() => import('~/pages/class/detail/session-detail/SessionDetail'))

export const publicRoute = {
  login: {
    path: '/',
    Component: Login
  }
}

export const protectedRoute = {
  dashboard: {
    name: 'Trang chủ',
    path: '/dashboard',
    Component: Home
  },
  profile: {
    name: 'Trang cá nhân',
    path: '/profile',
    Component: Profile
  },
  editProfile: {
    name: 'Cập nhật trang cá nhân ',
    path: '/profile/edit',
    Component: EditProfile
  },
  courseList: {
    name: 'Khóa học',
    path: '/courses',
    Component: CourseList
  },
  courseDetail: {
    name: 'Chi tiết khóa học',
    path: '/courses/:id',
    Component: CourseDetail
  },
  createCourse: {
    name: 'Tạo khóa học',
    path: '/courses/create',
    Component: CreateCourse
  },
  updateCourse: {
    name: 'Cập nhật khóa học',
    path: '/courses/:id/update',
    Component: UpdateCourse
  },
  publishClass: {
    name: 'Yêu cầu mở lớp học',
    path: '/courses/:courseId/publish-class',
    Component: PublishClass
  },
  courseSessionDetail: {
    name: 'Chi tiết bài học',
    path: '/courses/:courseId/sessions/:sessionId',
    Component: CourseSessionDetail
  },
  classRequestList: {
    name: 'Yêu cầu lớp học',
    path: '/class-requests',
    Component: ClassRequestList
  },
  classRequestDetail: {
    name: 'Chi tiết yêu cầu lớp học',
    path: '/class-requests/:id',
    Component: ClassRequestDetail
  },
  classList: {
    name: 'Lớp học',
    path: '/classes',
    Component: ViewClassList
  },
  classDetail: {
    name: 'Chi tiết lớp học',
    path: '/classes/:id',
    Component: ViewClassDetail
  },
  classSessionDetail: {
    name: 'Chi tiết buổi học',
    path: '/classes/:classId/sessions/:sessionId',
    Component: ClassSessionDetail
  }
}
