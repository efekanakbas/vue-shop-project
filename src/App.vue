<script setup lang="ts">
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
  disableTransition: false
})

watch(locale, (newVal) => {
  localStorage.setItem('last-locale', newVal)
})
</script>

<template>
  <VueQueryDevtools />
  <Toaster />
  <component :is="$route.meta.layout">
    <div class="lg:w-full py-7" id="coloredDiv">
      <div class="flex flex-row container px-5 mx-auto content justify-between">
        <router-view v-slot="{ Component }" class="view main-content flex-1 order-2">
          <component :is="Component" />
        </router-view>
        <router-view
          v-slot="{ Component }"
          name="LeftBar"
          class="view order-1 flex basis-1/5 bg-red-100"
        >
          <component :is="Component" />
        </router-view>
        <router-view
          v-slot="{ Component }"
          name="RightBar"
          class="view order-3 flex basis-1/5 bg-green-100"
        >
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </component>
</template>

<style></style>
