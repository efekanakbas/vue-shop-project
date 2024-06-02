<script lang="ts" setup>
//~ Imports

import { handleQuery } from '@/lib/tanstackQuery'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
//@ts-expect-error
import StarRating from 'vue-star-rating'
import { ShoppingCart } from 'lucide-vue-next'
import ProductItem from '@/components/ProductItem.vue'
import { Skeleton } from '@/components/ui/skeleton'
//~

//! Reactivity

//!

//^ Handlers

//^

//& Routes
const {
  data: electronicsData,
  isFetching,
  error,
  isLoading
} = handleQuery('electronicsProduct', 'products/category/electronics')
//&

//? Watches

//?

//* consoleLogs

//*
</script>

<template>
  <template v-if="isLoading">
    <div class="flex flex-col space-y-6 h-full items-center">
      <Skeleton class="w-[323.31px] h-[66px] rounded-full border" />

      <Skeleton
        class="w-full h-[400px] flex bg-gradient-to-r from-sky-600 to-sky-100"
        role="listitem"
        v-for="(_, index) in Array(4).fill(0)"
        :key="index"
      />
    </div>
  </template>
  <template v-else-if="isFetching">
    <div>İşlem devam ediyor...</div>
  </template>
  <template v-else>
    <div v-motion-fade class="h-full flex flex-col space-y-6">
      <header class="text-[32px] font-bold flex justify-center">
        <h1 role="heading" class="border py-2 px-20 rounded-full">Electronics</h1>
      </header>

      <Card
        class="w-full h-[400px] flex flex-row bg-gradient-to-r from-sky-600 to-sky-100 group"
        v-for="item in electronicsData"
        :key="item.id"
      >
        <ProductItem :item="item" />
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
