<script lang="ts" setup>
import MySheet from '@/components/MySheet.vue'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="flex flex-col space-y-[64px] items-center w-full overflow-x-hidden overflow-y-auto">
    <MySheet />
    <Navbar />
    <slot> Rest Layout </slot>
  </div>
</template>
