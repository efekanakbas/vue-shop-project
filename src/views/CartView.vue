<script lang="ts" setup>
//~ Imports
import { defineAsyncComponent, h } from 'vue'

import { Button } from '@/components/ui/button'

import { Skeleton } from '@/components/ui/skeleton'
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

//~

//! Reactivity

//!

//^ Handlers

//^

//& Routes

//&

//? Watches

//?

//* consoleLogs

//*
</script>

<template>
  <DialogDrawer />
</template>

<style></style>
