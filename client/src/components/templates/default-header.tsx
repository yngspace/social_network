import { LogoMain } from '@/assets/svg/logo'
import { _routeList } from '@/const'
import { store } from '@/store'
import { computed, defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import './header.sass'

export default defineComponent({
  setup () {
    const fullName = computed(() => `${store.state.user.firstName} ${store.state.user.lastName}`)
    return () => (
      <header class='header auth-header'>
        <div class='container'>
          <div class='header-wrap jcac-flex'>
            <div class='header-logo'>
              <RouterLink to={{ name: _routeList.index.name }}>
                <LogoMain />
              </RouterLink>
            </div>
            <div class='header-right'>
              <p>{fullName.value}</p>
            </div>
          </div>
        </div>
      </header>
    )
  }
})
