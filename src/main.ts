import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { MotionPlugin } from '@vueuse/motion'
//@ts-expect-error
import { i18n } from '@/lib/i18n.ts'

import App from './App.vue'
import router from './router'
const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 5 // 5 saniye
      }
    }
  }
}
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.use(MotionPlugin)
app.use(i18n)

app.mount('#app')
