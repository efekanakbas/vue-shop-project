<script lang="ts" setup>
import { computed, onMounted, ref, watch, provide } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Cat, LogOut, Menu, ShoppingCart } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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

import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useCounterStore } from '@/stores/counter'
import { useAuthStore } from '@/stores/auth'
import { useDarkStore } from '@/stores/dark'
import { ScrollArea } from '@/components/ui/scroll-area'
import CartItem from '@/components/CartItem.vue'
import { type UseDraggableReturn, VueDraggable } from 'vue-draggable-plus'

const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
  disableTransition: false
})
const toggleDark = useToggle(isDark)
const store = useCounterStore()
const authStore = useAuthStore()
const darkStore = useDarkStore()

const handleLogout = () => {
  localStorage.clear()
  store.$reset()

  setTimeout(() => {
    authStore.handleAuth()
  }, 100)
}

const handleBuy = () => {
  window.alert('Congratulations! You made a purchase.')
}

const el = ref<UseDraggableReturn>()

const onStart = () => {
  console.log('start')
}

const onUpdate = () => {
  console.log('update')
}
</script>

<template>
  <div class="flex flex-col space-y-[64px] items-center w-full overflow-x-hidden overflow-y-auto">
    <Teleport to="html">
      <Sheet>
        <SheetTrigger as-child>
          <button
            v-motion-slide-right
            v-if="store.count !== 0"
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
          <h1 class="font-bold mb-6 text-[32px]">Your Cart</h1>
          <ScrollArea style="height: calc(100% - 320px)" class="bg-slate-100 rounded-md">
            <ul class="flex flex-col text-gray-600 dark:text-white text-[24px] space-y-2 p-2">
              <VueDraggable
                ref="el"
                v-model="store.cart"
                :animation="150"
                ghostClass="ghost"
                class="flex flex-col gap-2 p-4 w-300px h-300px m-auto rounded"
                @start="onStart"
                @update="onUpdate"
              >
                <li
                  class="cursor-move bg-white rounded-lg"
                  v-for="item in store.cart"
                  :key="
                    //@ts-ignore
                    item.id
                  "
                >
                  <CartItem :item="item" />
                </li>
              </VueDraggable>
            </ul>
          </ScrollArea>
          <Card
            @click="handleBuy"
            role="button"
            class="flex justify-center mt-7 text-[32px] bg-orange-100 rounded-lg text-orange-500 items-center space-x-6 group cursor-pointer"
          >
            <p>{{ parseFloat(store.total.toFixed(2)) }}</p>
            <ShoppingCart
              class="group-hover:translate-x-20 transition-transform duration-500"
              :size="32"
            />
          </Card>
          <SheetFooter class="absolute bottom-6 w-full px-6 left-0">
            <SheetClose as-child>
              <Button type="button" class="mx-auto"> Close </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Teleport>

    <header class="fixed w-full h-[64px] bg-slate-300 dark:bg-slate-900 z-50">
      <nav class="container flex items-center h-full justify-between">
        <Sheet>
          <SheetTrigger as-child>
            <Menu role="button" class="block lg:hidden cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="left">
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
            <h1 class="font-bold mb-6 text-[32px]">Categories</h1>
            <div class="flex flex-col gap-6 text-gray-600 dark:text-white text-[24px]">
              <RouterLink activeClass=" text-[#F97316]" to="/category/men">Men</RouterLink>
              <RouterLink activeClass=" text-[#F97316]" to="/category/women">Women</RouterLink>
              <RouterLink activeClass=" text-[#F97316]" to="/category/electronics"
                >Electronics</RouterLink
              >
              <RouterLink activeClass=" text-[#F97316]" to="/category/jewelery"
                >Jewelery</RouterLink
              >
            </div>
            <SheetFooter class="absolute bottom-6 w-full px-6 left-0">
              <SheetClose as-child>
                <Button type="button" class="mx-auto"> Close </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <RouterLink to="/"
          ><h1
            class="text-rainbow-animation text-stroke-1-black dark:text-stroke-1-white hidden lg:block"
          >
            Shoppy
          </h1></RouterLink
        >
        <div class="hidden gap-20 items-center lg:flex justify-center">
          <RouterLink class="w-[34px]" activeClass=" text-[#F97316] font-bold" to="/category/men"
            >Men</RouterLink
          >
          <RouterLink class="w-[59px]" activeClass=" text-[#F97316] font-bold" to="/category/women"
            >Women</RouterLink
          >
          <RouterLink
            class="w-[80px]"
            activeClass=" text-[#F97316] font-bold"
            to="/category/electronics"
            >Electronics</RouterLink
          >
          <RouterLink
            class="w-[67px]"
            activeClass=" text-[#F97316] font-bold"
            to="/category/jewelery"
            >Jewelery</RouterLink
          >
        </div>

        <div class="flex gap-6 items-center">
          <Button
            @click="
              () => {
                toggleDark()
                darkStore.handleDark()
              }
            "
            variant="secondary"
            size="sm"
          >
            <Icon
              icon="radix-icons:sun"
              class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Icon
              icon="radix-icons:moon"
              class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>

          <Button as-child variant="secondary" size="sm">
            <RouterLink to="/cart" class="relative">
              <ShoppingCart />
              <Badge v-if="store.count > 0" class="absolute -top-2 -right-4">{{
                store.count
              }}</Badge>
            </RouterLink>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Avatar role="dropdown" class="cursor-pointer">
                <Cat />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-40">
              <DropdownMenuLabel>Auth</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup v-if="!authStore.isLogged">
                <DropdownMenuItem as-child class="cursor-pointer">
                  <RouterLink :to="{ name: 'login' }">Login</RouterLink>
                </DropdownMenuItem>
                <DropdownMenuItem as-child class="cursor-pointer">
                  <RouterLink :to="{ name: 'register' }">Register</RouterLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup v-else-if="authStore.isLogged">
                <DropdownMenuItem role="button" @click="handleLogout" class="cursor-pointer">
                  <LogOut class="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- <RouterLink to="/auth/login">Login</RouterLink>
          <RouterLink to="/auth/register">Register</RouterLink> -->
        </div>
      </nav>
    </header>
    <slot> Rest Layout </slot>
  </div>
</template>

<style>
.ghost {
  opacity: 0.5;
  background: rgb(254 215 170);
}

.text-rainbow-animation {
  font-family: arial black;
  font-size: 32px;
  background-image: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet,
    red
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-animation 3500s linear infinite;
}

@keyframes rainbow-animation {
  to {
    background-position: 4000rem;
  }
}

body {
  transition: background-color 0.5s;
}
</style>
