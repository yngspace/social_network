import { defineComponent } from 'vue'
import Header from '../components/templates/auth-header'

export default defineComponent({
  setup (_, { slots }) {
    return () => (
      <div class='layout layout-auth'>
        <Header />
        { slots.view && slots.view() }
      </div>
    )
  }
})
