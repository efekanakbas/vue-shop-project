<script lang="ts" setup>
//~ Imports
import { handleQuery } from '@/lib/tanstackQuery'
//~

//! Reactivity

//!

//^ Handlers

//^

//& Routes
const {
  data: womenData,
  isFetching,
  error,
  isLoading
} = handleQuery('womanProduct', "products/category/women's%20clothing")
//&

//? Watches

//?

//* consoleLogs

//*
</script>

<template>
  <template v-if="isLoading">
    <div>Yükleniyor...</div>
  </template>
  <template v-else-if="isFetching">
    <div>İşlem devam ediyor...</div>
  </template>
  <template v-else>
    <div v-motion-fade>
      {{ womenData }}
    </div>
  </template>
</template>

<style></style>
