<script setup lang="ts">
import { ref } from 'vue'
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
import { useMediaQuery } from '@vueuse/core'
//@ts-expect-error
import StarRating from 'vue-star-rating'
import { useDark } from '@vueuse/core'

const props = defineProps<{
  data: object
  condition: boolean
}>()

const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)
const isDesktop = useMediaQuery('(min-width: 1024px)')
const isDark = useDark()

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return

  onSelect()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('reInit', onSelect)
})
</script>

<template>
  <div class="w-full sm:w-auto lg-flex h-full flex flex-col justify-center items-center">
    <Carousel
      :opts="{
        align: 'start'
      }"
      :drag-free="isDesktop ? true : false"
      class="relative w-[calc(100vw-135px)] lg:w-full flex h-full"
      @init-api="(val) => (emblaMainApi = val)"
    >
      <CarouselContent class="flex h-full -ml-5" :class="condition ? 'py-5 ' : ''">
        <CarouselItem
          class="active:cursor-grabbing hover:cursor-grab lg:basis-[31.6%] flex h-full pl-5"
          v-for="item in data"
          :key="
            //@ts-expect-error
            item.id
          "
        >
          <div class="flex flex-1">
            <Card
              @click="
                $router.push({
                  name: 'product',
                  //@ts-expect-error
                  params: { id: item.id }
                })
              "
              class="group transition-transform duration-200 select-none flex flex-col flex-1 h-[330px] justify-center items-center w-full"
              :class="
                //@ts-expect-error
                item.category === 'jewelery' ? 'dark:bg-yellow-950' : 'dark:bg-sky-950'
              "
            >
              <CardContent
                class="aspect-square items-center justify-center p-8 transform transition-transform duration-200 group-hover:scale-105"
              >
                <figure class="">
                  <img
                    :alt="
                      //@ts-expect-error
                      item.title
                    "
                    class="object-contain w-full h-[120px]"
                    :src="
                      //@ts-expect-error
                      item.image
                    "
                  />
                </figure>
              </CardContent>

              <CardFooter
                :title="
                  //@ts-expect-error
                  item.title
                "
                class="p-3 flex justify-evenly basis-1/2 bg-gradient-to-t w-full rounded-lg flex-col items-start"
                :class="
                  //@ts-expect-error
                  item.category === 'jewelery'
                    ? 'from-yellow-300 dark:from-yellow-700'
                    : 'from-sky-300 dark:from-sky-700'
                "
              >
                <h1
                  :class="
                    //@ts-expect-error
                    item.category === 'jewelery'
                      ? 'text-yellow-800 dark:text-yellow-300'
                      : 'text-sky-800 dark:text-sky-300'
                  "
                >
                  {{
                    //@ts-expect-error
                    item.title.length > 17 ? item.title.substring(0, 17) + '...' : item.title
                  }}
                </h1>

                <StarRating
                  :glow="!isDark ? 3 : 0"
                  glow-color="#ffd055"
                  :star-size="10"
                  :rounded-corners="true"
                  :border-width="4"
                  :star-points="[
                    23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17
                  ]"
                  :read-only="true"
                  :rating="`${
                    //@ts-expect-error
                    item.rating.rate
                  }`"
                  class="custom-text"
                  :increment="0.01"
                ></StarRating>
                <p
                  class="text-[24px] font-bold"
                  :class="
                    //@ts-expect-error
                    item.category === 'jewelery'
                      ? 'text-yellow-800 dark:text-yellow-300'
                      : 'text-sky-800 dark:text-sky-300'
                  "
                >
                  ${{
                    //@ts-expect-error
                    item.price
                  }}
                </p>
              </CardFooter>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <Carousel
      v-if="!isDesktop"
      :drag-free="true"
      class="relative max-w-xs w-[calc(100vw-135px)] mx-auto mt-[6px]"
      @init-api="(val) => (emblaThumbnailApi = val)"
    >
      <CarouselContent class="flex gap-1 ml-0">
        <CarouselItem
          v-for="(item, index) in data"
          :key="index"
          class="pl-0 basis-1/3 cursor-pointer"
          @click="onThumbClick(index)"
        >
          <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
            <Card>
              <CardContent
                class="flex aspect-square items-center justify-center p-0 h-full w-full rounded-lg"
                :class="
                  //@ts-expect-error
                  item.category === 'jewelery'
                    ? ' dark:bg-yellow-700 bg-yellow-300'
                    : ' dark:bg-sky-700 bg-sky-300'
                "
              >
                <figure class="flex justify-center w-12 h-12">
                  <img
                    class="object-contain"
                    :alt="
                      //@ts-expect-error
                      item.title
                    "
                    :src="
                      //@ts-expect-error
                      item.image
                    "
                  />
                </figure>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>
