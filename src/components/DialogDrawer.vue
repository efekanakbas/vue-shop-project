<script lang="ts" setup>
import { ref } from 'vue'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useCounterStore } from '@/stores/counter'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/auth/LoginView.vue'
import { ShoppingCart } from 'lucide-vue-next'

const props = defineProps<{
  handlerAddToCart?: () => void
}>()

// Reuse `form` section
const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 1024px)')

const isOpen = ref(false)
const store = useCounterStore()
const authStore = useAuthStore()

const handleIncrement = () => {
  if (authStore.isLogged && props.handlerAddToCart) {
    props.handlerAddToCart()
  } else {
    console.log('deneme')
  }
}

const handleClose = () => {
  isOpen.value = false
}
</script>

<template>
  <template v-if="authStore.isLogged">
    <div>
      <Button @click="handleIncrement" class="flex gap-4">
        <figure><ShoppingCart /></figure>
        Add to cart
      </Button>
    </div>
  </template>

  <template v-else-if="!authStore.isLogged">
    <UseTemplate>
      <LoginView width="w-full" :handleClose="handleClose" />
    </UseTemplate>

    <Dialog v-if="isDesktop" v-model:open="isOpen">
      <DialogTrigger as-child>
        <Button @click="handleIncrement" class="flex gap-4">
          <figure><ShoppingCart /></figure>
          Add to cart
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px] bg-red-100 p-0 w-full">
        <GridForm />
      </DialogContent>
    </Dialog>

    <Drawer v-else v-model:open="isOpen">
      <DrawerTrigger as-child>
        <Button @click="handleIncrement" class="flex gap-4">
          <figure><ShoppingCart /></figure>
          Add to cart
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <GridForm />
        <DrawerFooter class="pt-4 bg-slate-100">
          <DrawerClose as-child>
            <Button variant="outline"> Cancel </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </template>

  <template v-else>
    <Dialog v-if="isDesktop" v-model:open="isOpen">
      <DialogTrigger as-child>
        <Button @click="handleIncrement">Arttır</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px] bg-red-100 p-0 w-full">
        <LoginView width="w-full" :handleClose="handleClose" />
      </DialogContent>
    </Dialog>

    <Drawer v-else v-model:open="isOpen">
      <DrawerTrigger as-child>
        <Button @click="handleIncrement">Arttır</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader class="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <GridForm />
        <DrawerFooter class="pt-2">
          <DrawerClose as-child>
            <Button variant="outline"> Cancel </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </template>
</template>
