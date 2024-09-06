import Courses from '~/pages/Courses'
import Home from '~/pages/Home'
import Login from '~/pages/login/Login'
import Logout from '~/pages/Logout'

export const publicRoute = {
  login: {
    path: '/',
    component: Login
  }
}

export const protectedRoute = {
  home: {
    path: '/home',
    component: Home
  },
  course: {
    path: '/courses',
    component: Courses
  },
  logout: {
    path: '/logout',
    component: Logout
  }
}
