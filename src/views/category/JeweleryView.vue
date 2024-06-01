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
  data: jeweleryData,
  isFetching,
  error,
  isLoading
} = handleQuery('jeweleryProduct', 'products/category/jewelery')
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
      {{ jeweleryData }}
    </div>
  </template>
</template>

<style></style>
