import { LogoMain } from '@/assets/svg/logo'
import { _routeList } from '@/const'
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import './header.sass'

export default defineComponent({
  setup () {
    return () => (
      <header class='header header-auth'>
        <div class='container'>
          <div class='header-wrap jcac-flex'>
            <div class='header-logo'>
              <RouterLink to={{ name: _routeList.index.name }}>
                <LogoMain />
              </RouterLink>
            </div>
            <nav class='header-nav'>
              <ul class='nav-list jcac-flex'>
                <li class='nav-item'>
                  <RouterLink to={{ name: _routeList.login.name }}>
                    Войти
                  </RouterLink>
                </li>
                <li class='nav-item'>
                  <RouterLink to={{ name: _routeList.registration.name }}>
                    Зарегистрироваться
                  </RouterLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    )
  }
})
