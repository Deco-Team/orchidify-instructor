import { lazy } from 'react'

const Home = lazy(() => import('~/pages/Home'))
const Courses = lazy(() => import('~/pages/course/Courses'))
const CourseDetail = lazy(() => import('~/pages/course/detail/CourseDetail'))
const Login = lazy(() => import('~/pages/login/Login'))
const Profile = lazy(() => import('~/pages/profile/Profile'))
const EditProfile = lazy(() => import('~/pages/profile/edit-profile/EditProfile'))
const CreateCourse = lazy(() => import('~/pages/course/create-course/CreateCourse'))
const LessonDetail = lazy(() => import('~/pages/course/detail/lessson-detail/LessonDetail'))
const AssignmentDetail = lazy(() => import('~/pages/course/detail/assignment-detail/AssignmentDetail'))

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
  course: {
    name: 'Khóa học',
    path: '/courses',
    Component: Courses
  },
  courseDetail: {
    name: 'Chi tiết khóa học',
    path: '/courses/:id',
    Component: CourseDetail
  },
  lessonDetail: {
    name: 'Chi tiết bài học',
    path: '/courses/:courseId/lesson/:lessonId',
    Component: LessonDetail
  },
  assignmentDetail: {
    name: 'Chi tiết bài tập',
    path: '/courses/:courseId/assignment/:assignmentId',
    Component: AssignmentDetail
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
  createCourse: {
    name: 'Tạo khóa học',
    path: '/courses/create',
    Component: CreateCourse
  }
}
