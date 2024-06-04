<script lang="ts" setup>
//~ Imports
import { ref, onMounted, onUnmounted } from 'vue'
import { handleQuery } from '@/lib/tanstackQuery'
import { watchEffect } from 'vue'
import { Skeleton } from '@/components/ui/skeleton'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { Card, CardContent, CardFooter } from '@/components/ui/card'

import { useResizeObserver } from '@vueuse/core'
import { useDarkStore } from '@/stores/dark'
import { useMediaQuery } from '@vueuse/core'
import ElectricityBeam from '@/components/ElectricityBeam.vue'
import MyCarousel from '@/components/MyCarousel.vue'
//~

//! Reactivity
const isDesktop = useMediaQuery('(min-width: 1024px)')
const el = ref(null)
const widthValue = ref(isDesktop.value ? 679 : 180)
const coloredDiv2 = ref<HTMLElement | null>(null)
const darkStore = useDarkStore()

//!

//^ Handlers

const updateBackgroundColor = (widthValue: number) => {
  const maxColor = [0, 0, 255] // Mavi (RGB)
  const minColor = [255, 192, 203] // Pembe (RGB)

  const interpolateColor = (start: any, end: number, factor: any) =>
    //@ts-expect-error
    start.map((startVal: any, i: number) => Math.round(startVal + factor * (end[i] - startVal)))

  const factor = isDesktop.value ? widthValue / 1359 : widthValue / 360
  //@ts-expect-error
  let interpolatedColor = interpolateColor(minColor, maxColor, factor)

  if (darkStore.isDark) {
    const darkenFactor = 0.5
    interpolatedColor = interpolatedColor.map((val: any) => Math.round(val * darkenFactor))
  }

  if (coloredDiv2.value) {
    coloredDiv2.value.style.backgroundColor = `rgb(${interpolatedColor.join(',')})`
  }
}

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  widthValue.value = Math.floor(width)
  updateBackgroundColor(widthValue.value)
})

const callDiv = () => {
  const coloredDiv = document.getElementById('coloredDiv')
  coloredDiv2.value = coloredDiv
}

//^

//& Routes
const {
  data: menData,
  error: menError,
  isLoading: menLoading
} = handleQuery('menProduct', "products/category/men's%20clothing")

const {
  data: womenData,
  error: womenError,
  isLoading: womenLoading
} = handleQuery('womanProduct', "products/category/women's%20clothing")

const {
  data: electronicsData,
  error: electronicsError,
  isLoading: electronicsLoading
} = handleQuery('electronicsProduct', 'products/category/electronics')

const {
  data: jeweleryData,
  error: jeweleryError,
  isLoading: jeweleryLoading
} = handleQuery('jeweleryProduct', 'products/category/jewelery')

//&

//? Watches
watchEffect(() => {
  if (menData.value) {
    console.log('dataQQQ', menData.value)
  }
})

watchEffect(() => {
  updateBackgroundColor(widthValue.value)
})

onMounted(() => {
  callDiv()
  if (widthValue.value) {
    updateBackgroundColor(widthValue.value)
  }
})

onUnmounted(() => {
  if (coloredDiv2.value) {
    coloredDiv2.value.style.removeProperty('background-color')
  }
})

//?

//* consoleLogs

//*
</script>

<template>
  <template v-if="menError || womenError || jeweleryError || electronicsError"> ERROR! </template>
  <template v-else-if="menLoading || womenLoading || jeweleryLoading || electronicsLoading">
    <div class="h-full w-full space-y-7 flex flex-col items-center justify-start pb-3">
      <Skeleton class="rounded-lg w-[140px] h-[40px]" />
      <div class="w-full h-full flex">
        <Skeleton
          class="rounded-lg mx-auto w-[calc(50vw-20px)] lg:w-full h-[500px] rounded-r-none bg-blue-100 dark:bg-blue-950"
        />
        <Skeleton
          class="rounded-lg mx-auto w-[calc(50vw-20px)] lg:w-full h-[500px] rounded-l-none bg-pink-100 dark:bg-pink-950"
        />
      </div>

      <Skeleton
        class="rounded-lg w-[324px] h-[66px] bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-500"
      />
      <div
        class="flex flex-col w-[calc(100vw-135px)] lg:w-[calc(100vw-568px)] lg:flex-row gap-6 justify-center items-center basis-3"
      >
        <Skeleton
          v-for="(item, index) in isDesktop ? Array(3).fill(0) : Array(1).fill(0)"
          :key="index"
          class="rounded-lg h-[260px] lg:h-[482.66px] w-full flex-wrap"
        />
      </div>
      <Skeleton class="rounded-lg w-[140px] h-[40px] bg-yellow-400 translate-y-1" />
      <div
        class="flex flex-col w-[calc(100vw-135px)] lg:w-[calc(100vw-568px)] lg:flex-row gap-6 justify-center items-center basis-3 translate-y-2"
      >
        <Skeleton
          v-for="(item, index) in isDesktop ? Array(3).fill(0) : Array(1).fill(0)"
          :key="index"
          class="rounded-lg h-[260px] lg:h-[482.66px] w-full flex-wrap"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="w-full flex flex-col space-y-7 h-full">
      <section class="space-y-7">
        <div class="flex justify-center">
          <h1
            class="text-[20px] bg-white dark:text-white w-[140px] h-[40px] flex justify-center items-center rounded-lg dark:bg-slate-900"
          >
            Clothings!
          </h1>
        </div>
        <ResizablePanelGroup
          v-motion
          :initial="{
            opacity: 0
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: '100',
              delay: 100
            }
          }"
          class="rounded-lg mx-auto max-w-[calc(100vw-40px)] lg:w-full max-h-[500px] overflow-auto"
          direction="horizontal"
        >
          <ResizablePanel ref="el" class="bg-blue-100 dark:bg-blue-950 overflow-auto">
            <h1 class="text-[40px] text-blue-600 text-center">Man</h1>
            <Separator class="bg-blue-300" />
            <ScrollArea style="height: calc(100% - 60px)" class="w-full rounded-md px-4">
              <ul class="flex gap-4 flex-wrap py-4">
                <li
                  class=""
                  v-for="(item, index) in menData"
                  :key="item.id"
                  v-motion
                  :initial="{
                    y: 20,
                    opacity: 0
                  }"
                  :enter="{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: (index + 1) * 200, // Her bir eleman için gecikme ayarlaması
                      type: 'spring',
                      stiffness: 100
                    }
                  }"
                >
                  <Card
                    @click="
                      $router.push({
                        name: 'product',
                        params: { id: item.id }
                      })
                    "
                    class="hover:scale-105 cursor-pointer transition-scale duration-200 dark:bg-blue-900"
                  >
                    <CardContent class="p-3 flex justify-center">
                      <img
                        :alt="item.title"
                        class="object-contain w-[90px] h-[110px] lg:w-[176px] lg:h-[216px]"
                        :src="item.image"
                      />
                    </CardContent>
                    <Separator />
                    <CardFooter class="p-3 flex justify-center"> {{ item.category }} </CardFooter>
                  </Card>
                </li>
              </ul>
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle with-handle />
          <ResizablePanel class="bg-pink-100 dark:bg-pink-950 overflow-auto">
            <h1 class="text-[40px] text-pink-600 text-center">Woman</h1>
            <Separator class="bg-pink-300" />
            <ScrollArea style="height: calc(100% - 60px)" class="w-full rounded-md px-4">
              <ul class="flex gap-4 flex-wrap py-4 flex-row-reverse">
                <li
                  class=""
                  v-for="(item, index) in womenData"
                  :key="item.id"
                  v-motion
                  :initial="{
                    y: 20,
                    opacity: 0
                  }"
                  :enter="{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: (index + 1) * 200, // Her bir eleman için gecikme ayarlaması
                      type: 'spring',
                      stiffness: 100
                    }
                  }"
                >
                  <Card
                    @click="
                      $router.push({
                        name: 'product',
                        params: { id: item.id }
                      })
                    "
                    class="hover:scale-105 cursor-pointer transition-scale duration-200 dark:bg-pink-900"
                  >
                    <CardContent class="p-3 flex justify-center">
                      <img
                        :alt="item.title"
                        class="object-contain w-[90px] h-[110px] lg:w-[176px] lg:h-[216px]"
                        :src="item.image"
                      />
                    </CardContent>
                    <Separator />
                    <CardFooter class="p-3 flex justify-center"> {{ item.category }} </CardFooter>
                  </Card>
                </li>
              </ul>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>

      <section class="space-y-7">
        <div class="relative flex justify-center w-full">
          <span
            class="absolute inset-0 w-full h-full z-0 mx-[50%] -translate-x-[50%] flex justify-center"
          >
            <div class="w-full h-full flex justify-center items-center">
              <Separator orientation="vertical" class="h-14 bg-blue-900 dark:bg-white" />
              <ElectricityBeam
                class="bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-500 dark:from-indigo-900 dark:via-indigo-700 dark:to-indigo-900"
              />
              <Separator orientation="vertical" class="h-14 bg-blue-900 dark:bg-white" />
            </div>
          </span>
          <h1
            class="overflow-hidden text-blue-900 dark:text-white opacity-80 p-4 z-10 text-[20px] font-bold"
          >
            Electronics!
            <div class="sparkles absolute inset-0 z-10"></div>
          </h1>
        </div>
        <MyCarousel :data="electronicsData" />
      </section>
      <section class="space-y-7">
        <div class="flex justify-center">
          <h1
            class="text-[20px] w-[140px] h-[40px] flex justify-center items-center rounded-lg text-yellow-800 bg-yellow-400 dark:bg-yellow-800 dark:text-yellow-400"
          >
            Jewelery!
          </h1>
        </div>
        <MyCarousel :data="jeweleryData" />
      </section>
    </div>
  </template>
</template>

<style></style>
