const _host = process.env.VUE_APP_API_HOST

const _routeList = {
  index: {
    name: 'index',
    path: '/',
    component: () => import('./pages/index/index')
  },
  registration: {
    name: 'registration',
    path: '/registration',
    component: () => import('./pages/auth/index')
  },
  login: {
    name: 'login',
    path: '/login',
    component: () => import('./pages/auth/index')
  }
}

export {
  _host,
  _routeList
}
