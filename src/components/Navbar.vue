<script lang="ts" setup>
//~ Imports
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Cat, LogOut, Menu, ShoppingCart } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { isAuthenticated } from '@/apis/auth.js'
import { useDarkStore } from '@/stores/dark'
//@ts-expect-error
import { supabase } from '@/lib/supabaseClient'
// Makros

//
//~

//! Reactivity

const counterStore = useCounterStore()

const darkStore = useDarkStore()
const sheetOpen = ref<undefined | boolean>(undefined)
const router = useRouter()

const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
  disableTransition: false
})
const toggleDark = useToggle(isDark)
const isAuth = isAuthenticated()
//!

//^ Handlers
const handleLogout = async () => {
  try {
    await supabase.auth.signOut()
    counterStore.$reset()
    localStorage.removeItem('loggedIn')
    router.push({ name: 'home' })

    // Sayfayı yenilemek için
    window.location.reload()
  } catch (error: any) {
    console.error('Çıkış yapılırken bir hata oluştu:', error.message)
  }
}

const handleSheet = () => {
  sheetOpen.value = false
  console.log('sheetOPen', sheetOpen.value)
  setTimeout(() => {
    sheetOpen.value = undefined
  }, 1000)
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
  <header class="fixed w-full h-[64px] bg-slate-300 dark:bg-slate-900 z-50">
    <nav class="container flex items-center h-full justify-between">
      <Sheet :open="sheetOpen">
        <SheetTrigger as-child>
          <Menu role="button" class="block lg:hidden cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle class="flex justify-center">
              <RouterLink @click="handleSheet" to="/">
                <h1 class="text-rainbow-animation text-stroke-1-black dark:text-stroke-1-white">
                  SHOPPY
                </h1>
              </RouterLink>
            </SheetTitle>
            <SheetDescription class="dark:text-white flex justify-center">
              You can buy anything you want!
            </SheetDescription>
          </SheetHeader>
          <Separator class="my-6" />
          <h1 class="font-bold mb-6 text-[32px]">Categories</h1>
          <div class="flex flex-col gap-6 text-gray-600 dark:text-white text-[24px]">
            <RouterLink @click="handleSheet" activeClass=" text-[#F97316]" to="/category/men"
              >Men</RouterLink
            >
            <RouterLink @click="handleSheet" activeClass=" text-[#F97316]" to="/category/women"
              >Women</RouterLink
            >
            <RouterLink
              @click="handleSheet"
              activeClass=" text-[#F97316]"
              to="/category/electronics"
              >Electronics</RouterLink
            >
            <RouterLink @click="handleSheet" activeClass=" text-[#F97316]" to="/category/jewelery"
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

      <RouterLink
        @click.prevent="
          () => {
            console.log('ZAAAAAAAAAAAAAAAAAAAA')
          }
        "
        to="/"
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
        <RouterLink class="w-[67px]" activeClass=" text-[#F97316] font-bold" to="/category/jewelery"
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
          class="w-12"
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

        <Button class="w-12" v-if="isAuth" as-child variant="secondary" size="sm">
          <RouterLink aria-label="Cart page" to="/cart" class="relative">
            <ShoppingCart />
            <Badge v-if="counterStore.cart.length > 0" class="absolute -top-2 -right-4">{{
              counterStore.cart.length
            }}</Badge>
          </RouterLink>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="Open menu"
            as-child
          >
            <Avatar class="cursor-pointer">
              <Cat />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-40">
            <DropdownMenuLabel>Auth</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup v-if="!isAuth">
              <DropdownMenuItem as-child class="cursor-pointer">
                <RouterLink :to="{ name: 'login' }">Login</RouterLink>
              </DropdownMenuItem>
              <DropdownMenuItem as-child class="cursor-pointer">
                <RouterLink :to="{ name: 'register' }">Register</RouterLink>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup v-else-if="isAuth">
              <DropdownMenuItem role="button" @click="handleLogout" class="cursor-pointer">
                <LogOut class="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  </header>
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
