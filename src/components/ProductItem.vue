<script lang="ts" setup>
//~ Imports
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
//@ts-expect-error
import StarRating from 'vue-star-rating'
import { Plus, Minus, Eye } from 'lucide-vue-next'
import { CardContent, CardHeader } from '@/components/ui/card'
import { defineAsyncComponent, h } from 'vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast/use-toast'
import { useMediaQuery } from '@vueuse/core'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const DialogDrawer = defineAsyncComponent({
  loader: () => import('@/components/DialogDrawer.vue'),
  delay: 200,
  loadingComponent: {
    render() {
      return h(Skeleton, {
        class: 'w-[103.2px] h-[40px ] rounded-sm'
      })
    }
  }
})

const props = defineProps<{
  item: any
}>()
//~

//! Reactivity

const count = ref(1)

const computedRating = computed(() => props.item.rating.rate)
const computedPrice = computed(() => {
  const price = props.item.price * count.value
  return parseFloat(price.toFixed(2))
})
const truncatedDescription = computed(() => {
  if (!isDesktop.value) {
    return props.item.description.length > 200
      ? props.item.description.substring(0, 200) + '...'
      : props.item.description
  } else {
    return props.item.description.length > 200
      ? props.item.description.substring(0, 200) + '...'
      : props.item.description
  }
})

const truncatedTitle = computed(() => {
  if (!isDesktop.value) {
    return props.item.title.length > 30
      ? props.item.title.substring(0, 30) + '...'
      : props.item.title
  } else {
    return props.item.title.length > 30
      ? props.item.title.substring(0, 30) + '...'
      : props.item.title
  }
})

const { toast } = useToast()
const isDesktop = useMediaQuery('(min-width: 1024px)')
const router = useRouter()
//!

//^ Handlers
const handleInc = () => {
  if (count.value > 9) {
    toast({
      class: 'border border-red-100 border-[5px]',
      title: "you can't increase it any more",
      description: 'You can increase up to 10',
      duration: 3000
    })
  } else {
    count.value++
  }
}

const handleDec = () => {
  if (count.value <= 1) {
    return
  } else {
    count.value--
  }
}

const handleToPage = () => {
  router.push({
    name: 'product',
    params: { id: props.item.id }
  })
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
  <CardHeader
    class="basis-2/5 rounded-lg transform transition-transform duration-200 group-hover:scale-105"
  >
    <img
      class="object-contain w-full h-full bg-white rounded-lg"
      :src="item.image"
      alt="item.title"
    />
  </CardHeader>
  <CardContent class="basis-3/5 p-4 flex flex-col justify-between py-5 pb-6">
    <div class="flex justify-between items-center">
      <h4 class="text-blue-800 text-[16px] font-bold uppercase">{{ item.category }}</h4>
      <StarRating
        :glow="3"
        glow-color="#ffd055"
        :star-size="20"
        :rounded-corners="true"
        :border-width="4"
        :star-points="[23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17]"
        :read-only="true"
        v-model:rating="computedRating"
        class="custom-text"
        :increment="0.01"
      ></StarRating>
    </div>
    <h1 :title="item.title" class="text-blue-900 capitalize text-[20px] lg:text-[40px] font-bold">
      {{ truncatedTitle }}
    </h1>
    <p :title="item.description" class="text-blue-800">{{ truncatedDescription }}</p>
    <div class="text-[40px] font-bold text-blue-900">${{ computedPrice }}</div>
    <div class="flex justify-between items-center">
      <div class="flex gap-4">
        <div class="bg-[#F5F5F5] h-10 rounded-lg flex items-center justify-between w-[120px] px-1">
          <button @click="handleDec" class="text-orange-500"><Minus /></button> {{ count }}
          <button @click="handleInc" class="text-orange-500"><Plus /></button>
        </div>
        <DialogDrawer
          :item="item"
          :count="count"
          :itemID="item.id"
          :computedPrice="computedPrice"
        />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <button
              @click="handleToPage"
              class="flex gap-4 group/button text-gray-500 text-[20px] items-center"
            >
              <Eye :size="40" class="group-hover/button:scale-110 transition-scale duration-300" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>To Product Page</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </CardContent>
</template>

<style></style>
