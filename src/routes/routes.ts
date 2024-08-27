import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Logout from '~/pages/Logout'

export const publicRoute = {
  login: {
    path: '/login',
    component: Login
  }
}

export const protectedRoute = {
  home: {
    path: '/',
    component: Home
  },
  logout: {
    path: '/logout',
    component: Logout
  }
}
