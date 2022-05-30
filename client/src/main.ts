import { createApp } from 'vue'
import App from './App'
import { createRouter, createWebHistory, NavigationGuardNext, RouteRecordRaw } from 'vue-router'
import { _routeList } from './const'
import auth from './middleware/auth'
import guest from './middleware/guest'

const routes: RouteRecordRaw[] = [
  { name: _routeList.index.name, path: _routeList.index.path, component: _routeList.index.component, meta: { middleware: [guest] } },
  { name: _routeList.login.name, path: _routeList.login.path, component: _routeList.login.component, meta: { middleware: [auth] } },
  { name: _routeList.registration.name, path: _routeList.registration.path, component: _routeList.registration.component, meta: { middleware: [auth] } },
  { path: '/:pathMatch(.*)*', redirect: _routeList.index.path }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next()
  const middleware = to.meta.middleware as Array<(next: NavigationGuardNext) => NavigationGuardNext>

  return middleware[0](next)
})

createApp(App).use(router).mount('#app')
