<script lang="ts" setup>
//~ Imports
import { computed, ref, onUnmounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { Plus, Minus, Trash } from 'lucide-vue-next'
import { useMediaQuery } from '@vueuse/core'

// Makros
const props = defineProps<{
  item: any
  cartTotal: number
  totalHandleInc: (value: number) => void
  totalHandleDec: (value: number) => void
}>()
//
//~

//! Reactivity
const counterStore = useCounterStore()
const computedPrice = computed(() => {
  const price = props.item.price * count.value
  return parseFloat(price.toFixed(2))
})

const count = ref(props.item.number)

const isDesktop = useMediaQuery('(min-width: 1024px)')

const truncatedTitle = computed(() => {
  if (!isDesktop.value) {
    return props.item.title.length > 60
      ? props.item.title.substring(0, 60) + '...'
      : props.item.title
  } else {
    return props.item.title.length > 70
      ? props.item.title.substring(0, 70) + '...'
      : props.item.title
  }
})

//!

//^ Handlers
const handleDec = () => {
  if (count.value < 2) {
    return
  } else {
    props.totalHandleDec(props.item.price)

    count.value--
  }
}

const handleInc = () => {
  if (count.value >= 10) {
    return
  } else {
    props.totalHandleInc(props.item.price)
    count.value++
  }
}

const handleDelete = () => {
  console.log('deleted')
}

//^

//& Routes

//&

//? Watches

//?

//* consoleLogs

//*
</script>

<template>
  <div class="flex h-[140px] relative">
    <Trash
      @click="handleDelete"
      class="absolute right-0 bottom-0 text-gray-500 cursor-pointer hover:scale-105"
    />
    <div class="flex basis-[55%]">
      <div class="flex">
        <div class="bg-slate-100 p-2 rounded-2xl">
          <figure class="w-[100px] h-full overflow-hidden">
            <img class="w-full h-full object-contain" :src="item.image" :alt="item.title" />
          </figure>
        </div>

        <div class="hidden lg:flex flex-col justify-evenly">
          <div class="flex flex-col">
            <h3 class="text-gray-500 text-[14px] uppercase px-3">{{ item.category }}</h3>
            <p :title="item.title" class="text-gray-900 text-[14px] font-bold ps-3 pe-10">
              {{ truncatedTitle }}
            </p>
          </div>
          <div class="flex flex-col text-[14px]">
            <div class="flex px-3">
              <p class="text-gray-500 w-[60px]">Rate</p>
              <p>• {{ item.rating.rate }}</p>
            </div>
            <div class="flex text-[14px] px-3">
              <p class="text-gray-500 w-[60px]">Count</p>
              <p class="w-12">• {{ item.rating.count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row justify-between basis-[45%] items-center">
      <div class="basis-1/3 font-bold">${{ item.price }}</div>
      <div class="basis-1/3">
        <div
          class="bg-[#F5F5F5] h-8 lg:h-8 rounded-lg flex items-center justify-between w-[80px] lg:w-[80px] px-1"
        >
          <button @click="handleDec" class="text-orange-500"><Minus :size="20" /></button>
          {{ count }}
          <button @click="handleInc" class="text-orange-500"><Plus :size="20" /></button>
        </div>
      </div>
      <div class="basis-1/3 text-end text-orange-500 font-bold text-[20px]">
        ${{ computedPrice }}
      </div>
    </div>
  </div>
</template>

<style></style>
