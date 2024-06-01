<script lang="ts" setup>
//~ Imports
import { computed, ref, onUnmounted } from 'vue'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Plus, Minus, ShoppingCart, X } from 'lucide-vue-next'
import { useCounterStore } from '@/stores/counter'

const props = defineProps<{
  item: any
}>()
//~

//! Reactivity
const counterStore = useCounterStore()
const computedPrice = computed(() => {
  const price = props.item.price * count.value
  return parseFloat(price.toFixed(2))
})

const initialTotal = counterStore.total
const count = ref(props.item.number)

onUnmounted(() => {
  counterStore.total = initialTotal
})

//!

//^ Handlers
const handleDec = () => {
  if (count.value < 2) {
    return
  } else {
    counterStore.totalHandleDec(props.item.price)
    count.value--
  }
}

const handleInc = () => {
  if (count.value >= 10) {
    return
  } else {
    counterStore.totalHandleInc(props.item.price)
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
// watchEffect(() => {
//   console.log('allcost')
// })
//?

//* consoleLogs
// console.log('dedede', props.allCost)
// console.log('parentHandleInc', props.parentHandleInc)
//*
</script>

<template>
  <Card class="flex relative bg-transparent">
    <X
      @click="handleDelete"
      role="button"
      class="absolute top-1 right-1 cursor-pointer text-destructive"
    />
    <CardHeader class="p-2 basis-2/5">
      <img class="object-contain w-full h-full" :src="item.image" :alt="item.title" />
    </CardHeader>
    <CardContent class="basis-3/5 p-2 flex justify-end flex-col items-center gap-2 lg:gap-8">
      <!-- <h1 class="">{{ item.category }}</h1> -->
      <span
        class="text-orange-500 text-[20px] lg:text-[28px] bg-slate-100 py-1 lg:py-2 px-4 lg:px-6 rounded-lg"
        >{{ computedPrice }}</span
      >
      <div
        class="bg-[#F5F5F5] h-8 lg:h-10 rounded-lg flex items-center justify-between w-[90px] lg:w-[120px] px-1"
      >
        <button @click="handleDec" class="text-orange-500"><Minus /></button>
        {{ count }}
        <button @click="handleInc" class="text-orange-500"><Plus /></button>
      </div>
    </CardContent>
  </Card>
</template>

<style></style>
