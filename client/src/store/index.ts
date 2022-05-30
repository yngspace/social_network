import axios from '@/axios'
import { _routeList } from '@/const'
import { User, UserMeta } from '@/types/user'
import { reactive } from 'vue'

const userMeta = new UserMeta()

export const store = reactive({
  state: {
    auth: {
      isAuth: false,
      token: null as null | string
    },
    user: new User(),
    theme: 'light' as 'light'| 'dark'
  }
})

export const mutations = {
  clearAuth (): void {
    store.state.auth.isAuth = false
    store.state.auth.token = null
    localStorage.clear()
  },
  onAuth (token: string): void {
    store.state.auth.token = `jwt ${token}`
    store.state.auth.isAuth = true
    localStorage.auth = token
    actions.getUser()
  },
  setUser (user: User) {
    store.state.user = user
  },
  setDarkTheme (): void {
    store.state.theme = 'dark'
  },
  setLightTheme (): void {
    store.state.theme = 'light'
  }
}

export const actions = {
  async getUser (): Promise<void> {
    try {
      mutations.setUser((await axios.get(userMeta.endpoint + 'me/')).data)
      console.log(store.state.user)
    } catch {
      console.log('error')
      mutations.clearAuth()
    }
  }
}
