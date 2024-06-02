<script lang="ts" setup>
//~ Imports
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { type UseDraggableReturn, VueDraggable } from 'vue-draggable-plus'
import { useCounterStore } from '@/stores/counter'
import { ShoppingCart, Trash2 } from 'lucide-vue-next'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import CartItem from '@/components/CartItem.vue'
import { useMediaQuery } from '@vueuse/core'
// Makros

//
//~

//! Reactivity
const el = ref<UseDraggableReturn>()
const counterStore = useCounterStore()
const router = useRouter()
const route = useRoute()
const isButtonClicked = ref(false)
const localTotal = ref(counterStore.total)
const resetRef = ref(false)
const isDeleting = ref(false)
const isDesktop = useMediaQuery('(min-width: 1024px)')
//!

//^ Handlers

const handleIsDeletingChange = () => {
  isDeleting.value = !isDeleting.value
}

const handleChangeResetRef = () => {
  resetRef.value = true
}

const handleChangeResetRefOnmount = () => {
  resetRef.value = false
}

const localInc = (value: number) => {
  localTotal.value += value
}

const localDec = (value: number) => {
  localTotal.value -= value
}

const setLocalTotal = (value: number) => {
  localTotal.value = value
}

const handleReset = () => {
  counterStore.$reset()
}

const handleBuy = () => {
  router.push({
    name: 'cart'
  })
}

const handleClicked = () => {
  isButtonClicked.value = false
}
//^

//& Routes

//&

//? Watches
watch(
  () => counterStore.total,
  (newValue) => {
    localTotal.value = newValue
  }
)

watch(resetRef, (newValue) => {
  if (newValue == true) {
    counterStore.handleResetCart()
  }
})

watch(isDeleting, async (newValue) => {
  console.log('isDeleting', isDeleting.value)
  if (newValue === true) {
    // İşlemi güvenli hale getirmek için küçük bir gecikme ekleyebilirsiniz
    await new Promise((resolve) => setTimeout(resolve, 0))
    localTotal.value = counterStore.total
  }
})
//?

//* consoleLogs

//*
</script>

<template>
  <Teleport to="html" v-if="route.name !== 'cart'">
    <Sheet
      :onOpenChange="
        () => {
          console.log('DSDSDDS')
        }
      "
    >
      <SheetTrigger as-child>
        <button
          v-motion-slide-right
          v-if="counterStore.cart.length !== 0"
          class="bg-orange-600/40 lg:bg-orange-600/70 p-2 pl-3 lg:p-3 lg:pl-4 rounded-l-full text-white fixed right-0 top-[49%]"
        >
          <ShoppingCart />
        </button>
      </SheetTrigger>
      <SheetContent :overlay-value="true" side="right">
        <SheetHeader>
          <SheetTitle class="flex justify-center">
            <RouterLink to="/"
              ><h1 class="text-rainbow-animation text-stroke-1-black dark:text-stroke-1-white">
                SHOPPY
              </h1></RouterLink
            ></SheetTitle
          >
          <SheetDescription class="dark:text-white flex justify-center">
            You can buy anything you want!
          </SheetDescription>
        </SheetHeader>
        <Separator class="my-6" />
        <div class="flex justify-between items-center mb-6">
          <h1 class="font-bold text-[24px] lg:text-[32px] flex items-center whitespace-nowrap">
            Your Cart
          </h1>

          <SheetClose as-child>
            <button @click="handleReset" class="flex text-gray-600 gap-1 group">
              <p class="whitespace-nowrap">Delete All</p>
              <Trash2 class="group-hover:scale-105" />
            </button>
          </SheetClose>
        </div>
        <ScrollArea
          :style="isDesktop ? ' height: calc(100% - 276px)' : ' height: calc(100% - 260px)'"
          class="bg-slate-100 rounded-md h-[calc(100%-276px)]"
        >
          <ul class="flex flex-col text-gray-600 dark:text-white text-[24px] space-y-2 p-2">
            <VueDraggable
              ref="el"
              v-model="counterStore.cart"
              :animation="150"
              ghostClass="ghost"
              class="flex flex-col gap-6 p-4 w-300px h-300px m-auto rounded"
            >
              <li
                class="cursor-move bg-white rounded-lg"
                v-for="item in counterStore.cart"
                :key="
                  //@ts-ignore
                  item.id
                "
              >
                <CartItem
                  :handleIsDeletingChange="handleIsDeletingChange"
                  :handleChangeResetRefOnmount="handleChangeResetRefOnmount"
                  :handleChangeResetRef="handleChangeResetRef"
                  :resetRef="resetRef"
                  :localTotal="localTotal"
                  :setLocalTotal="setLocalTotal"
                  :localInc="localInc"
                  :localDec="localDec"
                  :handleClicked="handleClicked"
                  :isButtonClicked="isButtonClicked"
                  :item="item"
                />
              </li>
            </VueDraggable>
          </ul>
        </ScrollArea>
        <!-- <SheetClose as-child> -->
        <Card
          @click="
            () => {
              handleBuy()
              isButtonClicked = true
            }
          "
          role="button"
          class="flex justify-center mt-7 text-[32px] bg-orange-100 rounded-lg text-orange-500 items-center space-x-6 group cursor-pointer"
        >
          <!-- --------------------------------------------------------- -->
          <p>{{ parseFloat(localTotal.toFixed(2)) }}</p>
          <!-- --------------------------------------------------------- -->
          <ShoppingCart
            class="group-hover:translate-x-20 transition-transform duration-500"
            :size="32"
          />
        </Card>
        <!-- </SheetClose> -->
        <SheetFooter class="absolute bottom-6 w-full px-6 left-0">
          <SheetClose as-child>
            <Button type="button" class="mx-auto"> Close </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </Teleport>
</template>

<style></style>
