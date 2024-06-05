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
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

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
  color: string
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
const isDark = useDark()
const { t } = useI18n()
//!

//^ Handlers
const handleInc = () => {
  if (count.value > 9) {
    toast({
      class: 'border border-red-100 border-[5px]',
      title: t('toast.inc.title'),
      description: t('toast.inc.desc'),
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
console.log('COLOR', props.color)
//*
</script>

<template>
  <CardHeader
    class="basis-2/5 rounded-lg transform transition-transform duration-200 group-hover:scale-105"
  >
    <figure class="h-[200px] lg:h-full">
      <img
        class="object-contain w-full h-full bg-white rounded-lg"
        :src="item.image"
        :alt="item.title"
        :class="
          color === 'blue'
            ? `dark:bg-blue-900`
            : color === 'pink'
              ? 'dark:bg-pink-900'
              : color === 'sky'
                ? 'dark:bg-sky-900'
                : 'dark:bg-yellow-900'
        "
      />
    </figure>
  </CardHeader>
  <CardContent class="basis-3/5 p-4 flex flex-col justify-between py-5 pb-6">
    <div class="flex justify-between items-center">
      <h4
        class="text-[16px] font-bold uppercase"
        :class="
          color === 'blue'
            ? `text-blue-800 dark:text-blue-300`
            : color === 'pink'
              ? 'text-pink-800 dark:text-pink-300'
              : color === 'sky'
                ? 'text-sky-800 dark:text-sky-300'
                : 'text-yellow-800 dark:text-yellow-300'
        "
      >
        {{
          item.category === "men's clothing"
            ? $t('category.men.subheading')
            : item.category === "women's clothing"
              ? $t('category.women.subheading')
              : item.category === 'electronics'
                ? $t('category.electronics.subheading')
                : $t('category.jewelery.subheading')
        }}
      </h4>
      <StarRating
        :glow="!isDark ? 3 : 0"
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
    <h1
      :title="item.title"
      class="capitalize text-[20px] lg:text-[40px] font-bold"
      :class="
        color === 'blue'
          ? `text-blue-900 dark:text-blue-200`
          : color === 'pink'
            ? 'text-pink-900 dark:text-pink-200'
            : color === 'sky'
              ? 'text-sky-900 dark:text-sky-200'
              : 'text-yellow-900 dark:text-yellow-200'
      "
    >
      {{ truncatedTitle }}
    </h1>
    <p
      :title="item.description"
      :class="
        color === 'blue'
          ? `text-blue-800 dark:text-blue-300`
          : color === 'pink'
            ? 'text-pink-800 dark:text-pink-300'
            : color === 'sky'
              ? 'text-sky-800 dark:text-sky-300'
              : 'text-yellow-800 dark:text-yellow-300'
      "
    >
      {{ truncatedDescription }}
    </p>
    <div
      class="text-[40px] font-bold"
      :class="
        color === 'blue'
          ? `text-blue-900 dark:text-blue-200`
          : color === 'pink'
            ? 'text-pink-900 dark:text-pink-200'
            : color === 'sky'
              ? 'text-sky-900 dark:text-sky-200'
              : 'text-yellow-900 dark:text-yellow-200'
      "
    >
      ${{ computedPrice }}
    </div>
    <div class="flex justify-between items-center gap-2">
      <div class="flex gap-4">
        <div
          class="bg-[#F5F5F5] dark:bg-slate-800 h-10 rounded-lg flex items-center justify-between w-[90px] lg:w-[120px] px-1"
        >
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
              class="flex gap-4 group/button text-gray-500 dark:text-gray-300 text-[20px] items-center"
            >
              <Eye :size="40" class="group-hover/button:scale-110 transition-scale duration-300" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ $t('category.tooltip') }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </CardContent>
</template>

<style></style>
