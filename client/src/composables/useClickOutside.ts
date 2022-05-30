import { onBeforeUnmount, onMounted, Ref } from 'vue'

export default function useClickOutside (element: Ref<HTMLElement|null>, callback: () => void) {
  const clickOutside = (event: any) => {
    const path = event.path || (event.composedPath && event.composedPath())
    const isClickOutside = path
      ? path.indexOf(element.value) < 0
      : !element.value?.contains(event.target)

    if (isClickOutside) callback()
  }

  onMounted(() => {
    document.addEventListener('click', clickOutside)
  })

  onBeforeUnmount(() => {
    document.addEventListener('click', clickOutside)
  })
}
