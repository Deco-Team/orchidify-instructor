import { lazy } from 'react'

const Home = lazy(() => import('~/pages/Home'))
const Login = lazy(() => import('~/pages/login/Login'))
const Profile = lazy(() => import('~/pages/profile/Profile'))
const EditProfile = lazy(() => import('~/pages/profile/edit-profile/EditProfile'))
const CourseList = lazy(() => import('~/pages/course/CourseList'))
const CourseDetail = lazy(() => import('~/pages/course/detail/CourseDetail'))
const CreateCourse = lazy(() => import('~/pages/course/create/CreateCourse'))
const UpdateCourse = lazy(() => import('~/pages/course/update/UpdateCourse'))
const CourseLessonDetail = lazy(() => import('~/pages/course/detail/lesson-detail/LessonDetail'))
const CourseAssignmentDetail = lazy(() => import('~/pages/course/detail/assignment-detail/AssignmentDetail'))

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
  courseLessonDetail: {
    name: 'Chi tiết bài học',
    path: '/courses/:courseId/lesson/:lessonId',
    Component: CourseLessonDetail
  },
  courseAssignmentDetail: {
    name: 'Chi tiết bài tập',
    path: '/courses/:courseId/assignment/:assignmentId',
    Component: CourseAssignmentDetail
  }
}
