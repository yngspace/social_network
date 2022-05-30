import axios from '@/axios'
import { DefaultInput } from '@/components/UI/input/default-input'
import { _routeList } from '@/const'
import { mutations } from '@/store'
import { UserMeta } from '@/types/user'
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LoginForm } from './types'

export default defineComponent({
  setup () {
    const route = useRoute()
    const { push } = useRouter()
    const userMeta = new UserMeta()
    const loginForm = ref<LoginForm>(new LoginForm())
    const loginFormErrors = ref<LoginForm>(new LoginForm())
    const isDisabledLogin = computed(() => {
      if (!loginForm.value.email.trim() || !loginForm.value.password.trim()) {
        return true
      }

      return false
    })

    const onLogin = async (e: Event) => {
      e.preventDefault()
      if (isDisabledLogin.value) return
      loginFormErrors.value = new LoginForm()

      const { data } = await axios.post(userMeta.endpoint + 'login/', loginForm.value)
      if (data.errors) {
        loginFormErrors.value = data.errors
      }

      if (data.token) {
        mutations.onAuth(data.token)
        push({ name: _routeList.index.name })
      }
    }

    return () => (
      <div class='auth-page'>
        {route.name === _routeList.login.name
          ? <h1 class='mb-3'>Авторизация</h1>
          : <h1 class='mb-3'>Регистрация</h1>
        }
        {route.name === _routeList.login.name && <form>
          <DefaultInput
            placeholder='Адрес электронной почты'
            modelValue={loginForm.value.email}
            onValueChange={(v: string) => { loginForm.value.email = v }}
            error={loginFormErrors.value.email}
          />
          <DefaultInput
            placeholder='Пароль'
            modelValue={loginForm.value.password}
            onValueChange={(v: string) => { loginForm.value.password = v }}
            error={loginFormErrors.value.password}
            type='password'
          />
          <button
            onClick={(e: Event) => onLogin(e)}
            disabled={isDisabledLogin.value}
            class='primary-button'
          >
            Войти
          </button>
        </form>}
      </div>
    )
  }
})
