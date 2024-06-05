<script lang="ts" setup>
import { ref } from 'vue'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger
} from '@/components/ui/drawer'

import { useCounterStore } from '@/stores/counter'

import LoginView from '@/views/auth/LoginView.vue'
import { ShoppingCart } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { isAuthenticated } from '@/apis/auth'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  fullWidth?: boolean
  itemID: number
  computedPrice: number
  count: number
  item: object
}>()

// Reuse `form` section
const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 1024px)')

const isOpen = ref(false)
const counterStore = useCounterStore()

const { toast } = useToast()
const isAuth = isAuthenticated()
const { t } = useI18n()

const handleAdd = async () => {
  if (isAuth) {
    const itemExists = counterStore.cart.some((el) => {
      //@ts-expect-error
      return el.id == props.itemID
    })

    if (itemExists) {
      await counterStore.addToCart(props.item, props.count)
    } else {
      await counterStore.addToCart(props.item, props.count)
    }
  } else {
    console.log('User is not logged')
  }
}

const handlerAddToCart = async () => {
  try {
    await handleAdd()
  } catch (error) {
    console.log('error', error)
    toast({
      class: 'border border-red-100 border-[5px]',
      title: t('toast.add.title'),
      description: t('toast.add.desc'),
      duration: 3000
    })
  }
}

const handleClose = () => {
  isOpen.value = false
}

console.log('isAUTH', isAuth)
</script>

<template>
  <template v-if="isAuth">
    <div>
      <Button @click="handlerAddToCart" :class="props.fullWidth && 'w-full'" class="flex gap-4">
        <figure><ShoppingCart /></figure>
        {{ $t('button.cart') }}
      </Button>
    </div>
  </template>

  <template v-else-if="!isAuth">
    <UseTemplate>
      <LoginView width="w-full" :handleClose="handleClose" />
    </UseTemplate>

    <Dialog v-if="isDesktop" v-model:open="isOpen">
      <DialogTrigger as-child>
        <Button @click="handlerAddToCart" class="flex gap-4">
          <figure><ShoppingCart /></figure>
          {{ $t('button.cart') }}
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px] bg-red-100 p-0 w-full">
        <GridForm />
      </DialogContent>
    </Dialog>

    <Drawer v-else v-model:open="isOpen">
      <DrawerTrigger as-child>
        <Button @click="handlerAddToCart" class="flex gap-4">
          <figure><ShoppingCart /></figure>
          {{ $t('button.cart') }}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <GridForm />
        <DrawerFooter class="pt-4 bg-slate-100 dark:bg-slate-900">
          <DrawerClose as-child>
            <Button variant="outline"> {{ $t('button.cancel') }} </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </template>
</template>
