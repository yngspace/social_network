import { defineComponent } from 'vue'
import Header from '../components/templates/default-header'

export default defineComponent({
  setup (_, { slots }) {
    return () => (
      <div class='layout layout-auth'>
        <Header />
        <div class='layout-grid-container screen container'>
          { slots.sidebar && slots.sidebar() }
          { slots.view && slots.view() }
        </div>
      </div>
    )
  }
})
