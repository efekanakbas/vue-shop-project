import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDarkStore = defineStore(
  'dark',
  () => {
    const isDark = ref(localStorage.getItem('vueuse-color-scheme') === 'dark' ? true : false)

    function handleDark() {
      isDark.value = !isDark.value
    }

    return { isDark, handleDark }
  },
  { persist: true }
)
