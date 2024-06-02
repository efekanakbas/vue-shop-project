<script lang="ts" setup>
//~ Imports
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Plus, Minus, X } from 'lucide-vue-next'
import { useCounterStore } from '@/stores/counter'

const props = defineProps<{
  item: any
  isButtonClicked?: boolean
  handleClicked: () => void
  localTotal: number
  localInc: (value: number) => void
  localDec: (value: number) => void
  setLocalTotal: (value: number) => void
  handleChangeResetRef: () => void
  handleChangeResetRefOnmount: () => void
  resetRef: boolean
  handleIsDeletingChange: () => void
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

//!

//^ Handlers
const handleDec = () => {
  if (count.value < 2) {
    return
  } else {
    props.localDec(props.item.price)
    count.value--
  }
}

const handleInc = () => {
  if (count.value >= 10) {
    return
  } else {
    props.localInc(props.item.price)
    count.value++
  }
}

const handleDelete = async () => {
  props.handleIsDeletingChange()
  await counterStore.deleteFromCart(props.item)
  props.handleIsDeletingChange()
}

//^

//& Routes

//&

//? Watches

onMounted(() => {
  props.handleChangeResetRefOnmount()
})

onBeforeUnmount(() => {
  console.log('QQQQQQQQQQQQQQ')
  if (!props.isButtonClicked) {
    props.setLocalTotal(initialTotal)
  } else {
    props.handleChangeResetRef()
    setTimeout(() => {
      counterStore.addToCart(props.item, count.value, true)
    }, 0)
  }
  props.handleClicked()
})
//?

//* consoleLogs

//*
</script>

<template>
  <Card class="flex relative bg-transparent h-[180px]">
    <X
      @click="handleDelete"
      role="button"
      class="absolute top-1 right-1 cursor-pointer text-destructive"
    />
    <CardHeader class="p-2 basis-2/5">
      <img class="object-contain w-full h-full" :src="item.image" :alt="item.title" />
    </CardHeader>
    <CardContent class="basis-3/5 p-2 flex justify-center flex-col items-center gap-2 lg:gap-8">
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
