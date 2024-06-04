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

defineProps<{
  data: object
}>()

const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)
const isDesktop = useMediaQuery('(min-width: 1024px)')

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
  <div class="w-full sm:w-auto">
    <Carousel
      :drag-free="isDesktop ? true : false"
      class="relative w-[calc(100vw-135px)] lg:w-full mx-auto"
      @init-api="(val) => (emblaMainApi = val)"
    >
      <CarouselContent>
        <CarouselItem
          class="active:cursor-grabbing hover:cursor-grab lg:basis-1/3"
          v-for="item in data"
          :key="
            //@ts-expect-error
            item.id
          "
        >
          <div class="p-1">
            <Card
              @click="
                $router.push({
                  name: 'product',
                  //@ts-expect-error
                  params: { id: item.id }
                })
              "
              class="group transition-transform duration-200 select-none dark:bg-slate-900"
            >
              <CardContent
                class="flex aspect-square items-center justify-center p-8 transform transition-transform duration-200 group-hover:scale-105"
              >
                <img
                  :alt="
                    //@ts-expect-error
                    item.title
                  "
                  class="object-contain w-full h-full"
                  :src="
                    //@ts-expect-error
                    item.image
                  "
                />
              </CardContent>
              <Separator />
              <CardFooter class="p-3 flex justify-center">
                {{
                  //@ts-expect-error
                  item.category
                }}
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
      class="relative max-w-xs w-[calc(100vw-135px)] mx-auto"
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
              <CardContent class="flex aspect-square items-center justify-center p-0 h-full w-full">
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
