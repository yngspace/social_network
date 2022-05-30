import { _routeList } from '@/const'
import { store } from '@/store'
import { NavigationGuardNext } from 'vue-router'

export default function (next: NavigationGuardNext): void {
  if (!store.state.auth.isAuth) {
    return next({
      name: _routeList.registration.name
    })
  }

  return next()
}
