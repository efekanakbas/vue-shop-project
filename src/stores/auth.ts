import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLogged = ref(localStorage.getItem('loggedIn') ? true : false)

    function handleAuth() {
      isLogged.value = !isLogged.value
    }

    return { isLogged, handleAuth }
  },
  { persist: true }
)
