<script lang="ts" setup>
//~ Imports
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { Separator } from '@/components/ui/separator'
import { useCounterStore } from '@/stores/counter'
import CartViewItem from '@/components/CartViewItem.vue'
import { useMediaQuery } from '@vueuse/core'
import { Trash2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import { useI18n } from 'vue-i18n'
import { type UseDraggableReturn, VueDraggable } from 'vue-draggable-plus'
//~

//! Reactivity
const counterStore = useCounterStore()
const model = ref('')
const coupon = ref('')
const isDesktop = useMediaQuery('(min-width: 1024px)')
const router = useRouter()

const cartTotal = ref(counterStore.total)
const localArray = ref(counterStore.cart)
const isDeleting = ref(false)
const { toast } = useToast()
const { t } = useI18n()
const el = ref<UseDraggableReturn>()
const isUpdating = ref(false)
//!

//^ Handlers

const handleIsDeletingChange = () => {
  isDeleting.value = !isDeleting.value
}

const handleBuy = () => {
  window.alert('Congratulations! You made a purchase')
  counterStore.$reset()
  router.push({
    name: 'home'
  })
}

const handleReset = () => {
  if (counterStore.cart.length !== 0) {
    counterStore.$reset()
    router.push({
      name: 'home'
    })
  } else {
    console.log('denememem')
    toast({
      class: 'border border-red-100 border-[5px]',
      title: t('toast.reset.title'),
      description: t('toast.reset.desc'),
      duration: 3000
    })
  }
}

const totalHandleInc = (value: number) => {
  cartTotal.value += value
}

const totalHandleDec = (value: number) => {
  cartTotal.value -= value
}

const onStart = () => {
  isUpdating.value = true
}

const onUpdate = () => {
  isUpdating.value = false
}
//^

//& Routes

//&

//? Watches

watch(
  () => counterStore.total,
  (newValue) => {
    cartTotal.value = newValue
  }
)

watch(
  () => counterStore.cart,
  (newValue) => {
    localArray.value = newValue
  }
)

watch(isDeleting, async (newValue) => {
  console.log('isDeleting', isDeleting.value)
  if (newValue === true) {
    await new Promise((resolve) => setTimeout(resolve, 0))
    cartTotal.value = counterStore.total
  }
})
//?

//* consoleLogs

//*
</script>

<template>
  <div
    class="flex flex-col lg:flex-row overflow-auto h-[calc(100vh-120px)] bg-slate-100 dark:bg-slate-700 rounded-2xl p-6 lg:space-x-6 space-y-[52px] lg:space-y-0 w-[calc(100vw-40px)] lg:w-[100vw]"
  >
    <main class="basis-2/3 h-full space-y-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="font-bold text-[24px]">{{ $t('cart.title') }}</h1>

          <p>
            <strong>{{ counterStore.cart.length }}</strong>
            {{ $t('cart.subtitle') }}
          </p>
        </div>
        <button @click="handleReset" class="flex gap-2 group cursor-pointer items-center">
          <p>{{ $t('button.deleteAll') }}</p>
          <Trash2 class="group-hover:scale-105" />
        </button>
      </div>

      <Card class="shadow-lg rounded-2xl">
        <CardHeader class="hidden lg:flex">
          <CardTitle class="flex text-[20px] justify-between">
            <div class="flex basis-[55%]">{{ $t('cart.left.first') }}</div>
            <div class="flex justify-between basis-[45%]">
              <div class="">{{ $t('cart.left.second') }}</div>
              <div class="">{{ $t('cart.left.third') }}</div>
              <div class="">{{ $t('cart.left.fourth') }}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <ScrollArea class="h-[calc(100vh-325px)]">
          <Alert
            class="scale-95 bg-orange-50 dark:bg-orange-950 mt-2 lg:mt-0"
            v-if="counterStore.cart.length === 0"
          >
            <AlertTitle> {{ $t('cart.alert.title') }}</AlertTitle>
            <AlertDescription> {{ $t('cart.alert.desc') }} </AlertDescription>
          </Alert>
          <CardContent v-else class="py-4">
            <ul>
              <VueDraggable
                ref="el"
                v-model="localArray"
                :animation="150"
                ghostClass="ghost"
                class="flex flex-col gap-5"
                @start="onStart"
                @update="onUpdate"
              >
                <li
                  class="shadow-md p-2 rounded-md cursor-move"
                  v-for="item in localArray"
                  :key="
                    //@ts-ignore
                    item.id
                  "
                >
                  <CartViewItem
                    :handleIsDeletingChange="handleIsDeletingChange"
                    :cartTotal="cartTotal"
                    :totalHandleInc="totalHandleInc"
                    :totalHandleDec="totalHandleDec"
                    :item="item"
                  />
                </li>
              </VueDraggable>
            </ul>
          </CardContent>
        </ScrollArea>
      </Card>
    </main>
    <aside class="basis-1/3">
      <ScrollArea
        class="shadow-lg rounded-2xl h-[calc(100vh-169px)]"
        :class="isDesktop ? '' : 'h-full'"
      >
        <Card class="rounded-2xl">
          <CardHeader>
            <CardTitle> {{ $t('cart.right.first.title') }} </CardTitle>
          </CardHeader>
          <CardContent>
            <section class="space-y-4">
              <Select v-model="model">
                <SelectTrigger
                  :disabled="!counterStore.cart.length"
                  class="bg-slate-100 dark:bg-slate-600"
                >
                  <SelectValue :placeholder="$t('cart.right.first.select.placeholder')" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{{ $t('cart.right.first.select.heading') }}</SelectLabel>
                    <SelectItem :value="$t('cart.right.first.select.first')">
                      {{ $t('cart.right.first.select.first') }}
                    </SelectItem>
                    <SelectItem :value="$t('cart.right.first.title')">
                      {{ $t('cart.right.first.select.second') }}
                    </SelectItem>
                    <SelectItem :value="$t('cart.right.first.title')">
                      {{ $t('cart.right.first.select.third') }}
                    </SelectItem>
                    <SelectItem :value="$t('cart.right.first.title')">
                      {{ $t('cart.right.first.select.fourth') }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div class="flex space-x-4">
                <Select>
                  <SelectTrigger
                    :disabled="!counterStore.cart.length"
                    class="bg-slate-100 dark:bg-slate-600"
                  >
                    <SelectValue :placeholder="$t('cart.right.first.select.placeholder')" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel> {{ $t('cart.right.first.type.heading') }}</SelectLabel>
                      <SelectItem :value="$t('cart.right.first.select.first')">
                        {{ $t('cart.right.first.type.first') }}
                      </SelectItem>
                      <SelectItem :value="$t('cart.right.first.select.second')">
                        {{ $t('cart.right.first.type.second') }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Input
                  class="bg-slate-100 dark:bg-slate-600"
                  :disabled="!counterStore.cart.length"
                  type="text"
                  :placeholder="$t('cart.right.first.zip')"
                />
              </div>
              <Button
                :disabled="!counterStore.cart.length"
                variant="outline"
                class="bg-slate-100 dark:bg-slate-600 w-full hover:bg-slate-200 dark:hover:bg-slate-700"
                >{{ $t('button.update') }}</Button
              >
            </section>
            <Separator class="my-7" />
            <section class="space-y-4">
              <CardTitle> {{ $t('cart.right.second.title') }} </CardTitle>
              <p class="text-gray-500 dark:text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, odit.
              </p>
              <Input
                :disabled="!counterStore.cart.length"
                :placeholder="$t('cart.right.second.placeholder')"
                v-model="coupon"
              />
              <Button :disabled="!counterStore.cart.length" variant="outline" class="w-full">
                {{ $t('button.apply') }}
              </Button>
            </section>
            <Separator class="my-7" />
            <section class="bg-orange-200 dark:bg-orange-950 p-4 rounded-2xl space-y-4">
              <CardTitle> {{ $t('cart.right.third.title') }} </CardTitle>
              <div class="text-[14px]">
                <div class="flex justify-between">
                  <p>{{ $t('cart.right.third.first') }}</p>
                  <p :class="coupon ? 'line-through text-gray-500' : ''">
                    ${{ parseFloat(cartTotal.toFixed(2)) }}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p>{{ $t('cart.right.third.second') }}</p>
                  <p>
                    {{ model ? model : '-' }}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p>{{ $t('cart.right.third.third') }}</p>
                  <p :class="coupon ? 'text-gray-500' : 'text-gray-900'">
                    {{ coupon ? '-$10.00' : '-' }}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="font-bold">{{ $t('cart.right.third.fourth') }}</p>
                  <p class="text-orange-500 font-bold scale-125 underline">
                    ${{
                      coupon
                        ? parseFloat((cartTotal - 10).toFixed(2))
                        : parseFloat(cartTotal.toFixed(2))
                    }}
                  </p>
                </div>
              </div>
              <Button :disabled="!counterStore.cart.length" @click="handleBuy" class="w-full">{{
                $t('button.buy')
              }}</Button>
            </section>
          </CardContent>
        </Card>
      </ScrollArea>
    </aside>
  </div>
</template>

<style></style>
