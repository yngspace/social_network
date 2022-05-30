import { SearchIcon } from '@/assets/svg/search'
import axios from '@/axios'
import useClickOutside from '@/composables/useClickOutside'
import { useDebounce } from '@/composables/useDebounce'
import { PaginationType } from '@/types'
import { User, UserMeta } from '@/types/user'
import { defineComponent, Ref, ref } from 'vue'
import { DefaultInput } from '../UI/input/default-input'
import './search-component.sass'

export default defineComponent({
  setup () {
    const userMeta = new UserMeta()
    const rootElement = ref(null) as unknown as Ref<HTMLElement>
    const model = ref<string>('')
    const searchList = ref<PaginationType<User>>(new PaginationType())
    const searchUser = useDebounce(async (v: string) => {
      if (!v) return outsideCallback()

      const { data } = await axios.get(userMeta.endpoint, {
        params: { search: model.value }
      })
      searchList.value = data
    }, 1000)

    const onValueChange = (v: string) => {
      model.value = v
      searchUser(v)
    }

    const outsideCallback = () => {
      if (!model.value.trim()) return
      model.value = ''
    }

    useClickOutside(rootElement, outsideCallback)

    return () => (
      <div class='search-component' ref={rootElement}>
        <DefaultInput
          modelValue={model.value}
          placeholder='Поиск'
          onValueChange={(v: string) => onValueChange(v)}
        />
        <SearchIcon />
        {model.value.trim() !== '' && <div class='search-list'>
          {searchList.value.results.map(item =>
            <span class='search-item'>{`${item.firstName} ${item.lastName}`}</span>
          )}
          <span class='search-item search-item-global'>Перейти к глобальному поиску</span>
        </div>}
      </div>
    )
  }
})
