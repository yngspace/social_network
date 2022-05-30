import { defineComponent, onMounted, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import DefaultLayout from './layout/default'
import AuthLayout from './layout/auth-layout'
import { mutations, store } from './store'
import './styles/styles.sass'
import moment from 'moment'
import { _routeList } from './const'

export default defineComponent({
  setup () {
    const { push } = useRouter()
    window.addEventListener('401 Unauthorized', mutations.clearAuth)
    onMounted(() => {
      if (localStorage.auth) mutations.onAuth(localStorage.auth)
      if (parseInt(moment().format('H')) > 19) {
        mutations.setDarkTheme()
        document.body.classList.add('dark')
      }
    })

    watch(() => store.state.auth.isAuth, (to) => {
      if (!to) push({ name: _routeList.registration.name })
    })

    return () => (
      <div class={{
        light: store.state.theme === 'light',
        dark: store.state.theme === 'dark'
      }}>
        {store.state.auth.isAuth
          ? <DefaultLayout v-slots={{
            view: () => <RouterView/>
          }}/>
          : <AuthLayout v-slots={{
            view: () => <RouterView class='screen container'/>
          }}/>
        }
      </div>
    )
  }
})
