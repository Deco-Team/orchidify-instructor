import { lazy } from 'react'

const Home = lazy(() => import('~/pages/Home'))
const Courses = lazy(() => import('~/pages/Courses'))
const Login = lazy(() => import('~/pages/login/Login'))
const Profile = lazy(() => import('~/pages/profile/Profile'))

export const publicRoute = {
  login: {
    path: '/',
    Component: Login
  }
}

export const protectedRoute = {
  dashboard: {
    path: '/dashboard',
    Component: Home
  },
  course: {
    path: '/courses',
    Component: Courses
  },
  profile: {
    path: '/profile',
    Component: Profile
  }
}
