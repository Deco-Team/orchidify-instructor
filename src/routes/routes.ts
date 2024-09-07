import { lazy } from 'react'

const Home = lazy(() => import('~/pages/Home'))
const Courses = lazy(() => import('~/pages/Courses'))
const Login = lazy(() => import('~/pages/login/Login'))

export const publicRoute = {
  login: {
    path: '/',
    Component: Login
  }
}

export const protectedRoute = {
  home: {
    path: '/home',
    Component: Home
  },
  course: {
    path: '/courses',
    Component: Courses
  }
}
