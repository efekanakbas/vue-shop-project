<script lang="ts" setup>
//~ Imports
import { ref, onMounted, onUnmounted } from 'vue'
import { handleQuery } from '@/lib/tanstackQuery'
import { watchEffect } from 'vue'
import { Skeleton } from '@/components/ui/skeleton'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { watchOnce } from '@vueuse/core'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
//@ts-expect-error
import LightGallery from '@/components/LightGallery.vue'
import { useResizeObserver } from '@vueuse/core'
import { useDarkStore } from '@/stores/dark'
import { useMediaQuery } from '@vueuse/core'
import ElectricityBeam from '@/components/ElectricityBeam.vue'

//~

//! Reactivity
const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)

const el = ref(null)
const widthValue = ref(679)
const coloredDiv2 = ref<HTMLElement | null>(null)
const darkStore = useDarkStore()
const isDesktop = useMediaQuery('(min-width: 1024px)')

//!

//^ Handlers
function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

const updateBackgroundColor = (widthValue: number) => {
  const maxColor = [0, 0, 255] // Mavi (RGB)
  const minColor = [255, 192, 203] // Pembe (RGB)

  const interpolateColor = (start: any, end: number, factor: any) =>
    //@ts-expect-error
    start.map((startVal: any, i: number) => Math.round(startVal + factor * (end[i] - startVal)))

  const factor = widthValue / 1359
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
  isFetching,
  error,
  isLoading
} = handleQuery('menProduct', "products/category/men's%20clothing")

const { data: womenData } = handleQuery('womanProduct', "products/category/women's%20clothing")

const { data: electronicsData } = handleQuery('electronicsProduct', 'products/category/electronics')

const { data: jeweleryData } = handleQuery('jeweleryProduct', 'products/category/jewelery')

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

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return

  onSelect()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('reInit', onSelect)
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
  <template v-if="error"> ERROR! </template>
  <template v-else-if="isLoading">
    <div class="h-[200vh] space-y-5 flex flex-col items-center justify-start">
      <Skeleton class="rounded-lg w-[140px] h-10" />
      <Skeleton class="rounded-lg mx-auto max-w-[calc(100vw-40px)] lg:w-full h-[500px]" />
      <Skeleton class="rounded-lg w-[324px] h-[62px]" />
      <div class="flex flex-row gap-5 justify-center items-center w-full basis-3">
        <Skeleton
          v-for="(item, index) in Array(3).fill(0)"
          :key="index"
          class="rounded-lg h-[483.66px] w-full flex-wrap"
        />
      </div>
    </div>
  </template>
  <template v-else-if="isFetching">
    <div>Loading...</div>
  </template>
  <template v-else>
    <div class="w-full flex flex-col space-y-5">
      <div class="flex justify-center">
        <h1
          class="text-[20px] bg-white dark:bg-black dark:text-white w-[140px] h-[40px] flex justify-center items-center rounded-lg"
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
        <ResizablePanel ref="el" class="bg-blue-100 overflow-auto">
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
                  class="hover:scale-105 cursor-pointer transition-scale duration-200"
                >
                  <CardContent class="p-3 flex justify-center">
                    <img
                      :alt="item.alt"
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
        <ResizablePanel class="bg-pink-100 overflow-auto">
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
                  class="hover:scale-105 cursor-pointer transition-scale duration-200"
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
      <div class="relative flex justify-center w-full">
        <span
          class="absolute inset-0 w-full h-full z-0 mx-[50%] -translate-x-[50%] flex justify-center"
        >
          <div class="w-full h-full flex justify-center items-center">
            <Separator orientation="vertical" class="h-14 bg-blue-900 dark:bg-white" />
            <ElectricityBeam
              class="bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-500"
            />
            <Separator orientation="vertical" class="h-14 bg-blue-900 dark:bg-white" />
          </div>
        </span>
        <h1 class="overflow-hidden text-blue-900 p-4 z-10 text-[20px] font-bold">
          Electronics!
          <div class="sparkles absolute inset-0 z-10"></div>
        </h1>
      </div>
      <div class="w-full sm:w-auto flex justify-center">
        <Carousel
          :drag-free="isDesktop ? true : false"
          class="relative w-[calc(100vw-135px)]"
          @init-api="(val) => (emblaMainApi = val)"
        >
          <CarouselContent>
            <CarouselItem
              class="active:cursor-grabbing hover:cursor-grab lg:basis-1/3"
              v-for="item in electronicsData"
              :key="item.id"
            >
              <div class="p-1">
                <Card
                  @click="
                    $router.push({
                      name: 'product',
                      params: { id: item.id }
                    })
                  "
                  class="group transition-transform duration-200 select-none"
                >
                  <CardContent
                    class="flex aspect-square items-center justify-center p-8 transform transition-transform duration-200 group-hover:scale-105"
                  >
                    <img :alt="item.alt" class="object-contain w-full h-full" :src="item.image" />
                  </CardContent>
                  <Separator />
                  <CardFooter class="p-3 flex justify-center"> {{ item.category }} </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div class="flex justify-center">
        <h1 class="text-[20px] px-6 py-2 rounded-lg text-slate-900" style="background-color: gold">
          Jewelery!
        </h1>
      </div>
      <div v-if="jeweleryData" class="flex justify-center">
        <LightGallery :data="jeweleryData" />
      </div>
    </div>
  </template>
</template>

<style></style>
