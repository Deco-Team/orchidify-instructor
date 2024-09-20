import { lazy } from 'react'

const Home = lazy(() => import('~/pages/Home'))
const Courses = lazy(() => import('~/pages/course/Courses'))
const Login = lazy(() => import('~/pages/login/Login'))
const Profile = lazy(() => import('~/pages/profile/Profile'))
const EditProfile = lazy(() => import('~/pages/profile/edit-profile/EditProfile'))
const CreateCourse = lazy(() => import('~/pages/course/create-course/CreateCourse'))

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
