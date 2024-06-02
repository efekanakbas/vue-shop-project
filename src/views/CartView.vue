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
  counterStore.$reset()
  router.push({
    name: 'home'
  })
}

const totalHandleInc = (value: number) => {
  cartTotal.value += value
}

const totalHandleDec = (value: number) => {
  cartTotal.value -= value
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
    class="flex flex-col lg:flex-row overflow-auto h-[calc(100vh-104px)] bg-slate-100 dark:bg-slate-600 rounded-2xl p-6 lg:space-x-6 space-y-[52px] lg:space-y-0 w-[calc(100vw-40px)] lg:w-[100vw]"
  >
    <main class="basis-2/3 h-full space-y-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="font-bold text-[24px]">Shopping Cart</h1>

          <p>
            <strong>{{ counterStore.cart.length }}</strong>
            in your cart.
          </p>
        </div>
        <button @click="handleReset" class="flex gap-2 group cursor-pointer items-center">
          <p>Delete All</p>
          <Trash2 class="group-hover:scale-105" />
        </button>
      </div>

      <Card class="shadow-lg rounded-2xl">
        <CardHeader class="hidden lg:flex">
          <CardTitle class="flex text-[20px] justify-between">
            <div class="flex basis-[55%]">Product</div>
            <div class="flex justify-between basis-[45%]">
              <div class="">Price</div>
              <div class="">Quantity</div>
              <div class="">Total Price</div>
            </div>
          </CardTitle>
        </CardHeader>
        <ScrollArea class="h-[calc(100vh-309px)]">
          <Alert
            class="scale-95 bg-orange-50 dark:bg-orange-700"
            v-if="counterStore.cart.length === 0"
          >
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription> You have no product in your cart. </AlertDescription>
          </Alert>
          <CardContent
            v-else
            class="py-4"
            v-for="(item, index) in localArray"
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

            <Separator
              class="mt-5 h-[2px]"
              v-if="
                Number(counterStore.cart.length) === 1 ||
                index !== Number(counterStore.cart.length) - 1
              "
            />
          </CardContent>
        </ScrollArea>
      </Card>
    </main>
    <aside class="basis-1/3">
      <ScrollArea
        class="shadow-2xl rounded-2xl h-[calc(100vh-153px)]"
        :class="isDesktop ? '' : 'h-full'"
      >
        <Card class="rounded-2xl">
          <CardHeader>
            <CardTitle> Calculated Shipping </CardTitle>
          </CardHeader>
          <CardContent>
            <section class="space-y-4">
              <Select v-model="model">
                <SelectTrigger
                  :disabled="!counterStore.cart.length"
                  class="bg-slate-100 dark:bg-slate-600"
                >
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    <SelectItem value="apple"> Turkiye </SelectItem>
                    <SelectItem value="azerbaijan"> Azerbaijan </SelectItem>
                    <SelectItem value="uzbekistan"> Uzbekistan </SelectItem>
                    <SelectItem value="kazakhistan"> Kazakhistan </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div class="flex space-x-4">
                <Select>
                  <SelectTrigger
                    :disabled="!counterStore.cart.length"
                    class="bg-slate-100 dark:bg-slate-600"
                  >
                    <SelectValue placeholder="User type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Types</SelectLabel>
                      <SelectItem value="person"> Person </SelectItem>
                      <SelectItem value="company"> Company </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Input
                  class="bg-slate-100 dark:bg-slate-600"
                  :disabled="!counterStore.cart.length"
                  type="text"
                  placeholder="ZIP code"
                />
              </div>
              <Button
                :disabled="!counterStore.cart.length"
                variant="outline"
                class="bg-slate-100 dark:bg-slate-600 w-full hover:bg-slate-200 dark:hover:bg-slate-700"
                >Update</Button
              >
            </section>
            <Separator class="my-8" />
            <section class="space-y-4">
              <CardTitle> Coupon Code </CardTitle>
              <p class="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, odit.
              </p>
              <Input
                :disabled="!counterStore.cart.length"
                placeholder="Coupon Code "
                v-model="coupon"
              />
              <Button :disabled="!counterStore.cart.length" variant="outline" class="w-full"
                >Aplly</Button
              >
            </section>
            <Separator class="my-8" />
            <section class="bg-orange-200 dark:bg-orange-400 p-4 rounded-2xl space-y-4">
              <CardTitle> Cart Total </CardTitle>
              <div class="text-[14px]">
                <div class="flex justify-between">
                  <p>Card Subtotal</p>
                  <p :class="coupon ? 'line-through text-gray-500' : ''">
                    ${{ parseFloat(cartTotal.toFixed(2)) }}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p>Country</p>
                  <p>
                    {{ model ? model : '-' }}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p>Discount</p>
                  <p :class="coupon ? 'text-gray-500' : 'text-gray-900'">
                    {{ coupon ? '-$10.00' : '-' }}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="font-bold">Card Total</p>
                  <p class="text-orange-500 dark:text-orange-900 font-bold scale-125 underline">
                    ${{
                      coupon
                        ? parseFloat((cartTotal - 10).toFixed(2))
                        : parseFloat(cartTotal.toFixed(2))
                    }}
                  </p>
                </div>
              </div>
              <Button :disabled="!counterStore.cart.length" @click="handleBuy" class="w-full"
                >Buy it!</Button
              >
            </section>
          </CardContent>
        </Card>
      </ScrollArea>
    </aside>
  </div>
</template>

<style></style>
