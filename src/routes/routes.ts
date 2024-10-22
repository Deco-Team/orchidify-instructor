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
  }
}
