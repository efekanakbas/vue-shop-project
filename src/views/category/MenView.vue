<script lang="ts" setup>
//~ Imports

import { handleQuery } from '@/lib/tanstackQuery'
import { Card } from '@/components/ui/card'
import ProductItem from '@/components/ProductItem.vue'
import { Skeleton } from '@/components/ui/skeleton'
//~

//! Reactivity

//!

//^ Handlers

//^

//& Routes
const {
  data: menData,
  error,
  isLoading
} = handleQuery('menProduct', "products/category/men's%20clothing")
//&

//? Watches

//?

//* consoleLogs

//*
</script>

<template>
  <template v-if="error"> ERROR! </template>
  <template v-else-if="isLoading">
    <div class="flex flex-col space-y-6 h-full items-center w-[calc(100vw-48px)] lg:w-full">
      <Skeleton class="w-[229.3px] h-[66px] rounded-full border" />

      <Skeleton
        class="w-[calc(100vw-40px)] lg:w-full h-[500px] lg:h-[400px] flex bg-gradient-to-r dark:from-blue-950 dark:to-blue-800 from-blue-900 to-blue-100"
        role="listitem"
        v-for="(_, index) in Array(4).fill(0)"
        :key="index"
      />
    </div>
  </template>
  <template v-else>
    <div v-motion-fade class="h-full flex flex-col space-y-6">
      <header class="text-[32px] font-bold flex justify-center">
        <h1 role="heading" class="border py-2 px-20 rounded-full">
          {{ $t('category.men.heading') }}
        </h1>
      </header>

      <Card
        class="w-[calc(100vw-40px)] lg:w-full h-full lg:h-[400px] flex flex-col lg:flex-row bg-gradient-to-r dark:from-blue-950 dark:to-blue-800 from-blue-900 to-blue-100 group"
        v-for="item in menData"
        :key="item.id"
      >
        <ProductItem color="blue" :item="item" />
      </Card>
    </div>
  </template>
</template>

<style scoped>
.custom-text {
  font-weight: bold;
  font-size: 1.9em;
  border: 1px solid #cfcfcf;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: #999;
  background: #fff;
}
</style>
