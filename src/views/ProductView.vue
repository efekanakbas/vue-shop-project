<script lang="ts" setup>
//~ Imports
import { ref, computed } from 'vue'
import { handleQuery } from '@/lib/tanstackQuery'
import DialogDrawer from '@/components/DialogDrawer.vue'
import { Plus, Minus } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LoaderCircle } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

// Makros
const props = defineProps<{
  id: string
}>()
//
//~

//! Reactivity
const count = ref(1)
const { toast } = useToast()

const computedPrice = computed(() => {
  const price = data.value.price * count.value
  return parseFloat(price.toFixed(2))
})
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

//^

//& Routes
const { data, isLoading, isFetching } = handleQuery('product', `products/${props.id}`, true)
//&

//? Watches

//?

//* consoleLogs

//*
</script>

<template>
  <template v-if="isLoading">
    <div class="h-[calc(100vh-120px)] w-full flex items-center justify-center">
      <LoaderCircle class="animate-spin text-orange-600" :size="72" />
    </div>
  </template>
  <template v-else-if="isFetching">
    <div class="h-[calc(100vh-120px)] w-full flex items-center justify-center">
      <LoaderCircle class="animate-spin text-orange-600" :size="72" />
    </div>
  </template>
  <template v-else>
    <div v-motion-fade class="block h-full lg:flex lg:h-[calc(100vh-120px)]">
      <div class="basis-5/12 flex">
        <figure class="w-full h-full flex items-center">
          <img class="object-contain w-full h-[80%]" :src="data.image" :alt="data.title" />
        </figure>
      </div>
      <ScrollArea class="basis-7/12 py-20 px-4">
        <div class="flex flex-col justify-center space-y-10">
          <h1 class="uppercase text-gray-600 font-bold dark:text-gray-300">
            {{
              data.category === "men's clothing"
                ? $t('category.men.subheading')
                : data.category === "women's clothing"
                  ? $t('category.women.subheading')
                  : data.category === 'electronics'
                    ? $t('category.electronics.subheading')
                    : $t('category.jewelery.subheading')
            }}
          </h1>
          <h3 class="text-[40px] font-extrabold">{{ data.title }}</h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ data.description }}
          </p>
          <span class="font-bold text-[32px] text-center">${{ computedPrice }}</span>
          <div
            class="bg-[#F5F5F5] h-10 rounded-lg flex items-center justify-between w-[120px] px-1 mx-auto dark:bg-slate-700"
          >
            <button @click="handleDec" class="text-orange-500"><Minus /></button> {{ count }}
            <button @click="handleInc" class="text-orange-500"><Plus /></button>
          </div>
          <div class="flex gap-4 flex-col items-center">
            <DialogDrawer
              :item="data"
              :count="count"
              class="w-full"
              :computedPrice="computedPrice"
              :itemID="data.id"
              :fullWidth="true"
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  </template>
</template>

<style></style>
