<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <component :is="$route.meta.layout">
    <div class="lg:w-full py-5" id="coloredDiv">
      <div class="flex flex-row container px-5 mx-auto content justify-between">
        <router-view v-slot="{ Component }" class="view main-content flex-1 order-2">
          <!-- <Transition :name="route.meta.transition"> -->
          <!-- <KeepAlive> -->
          <component :is="Component" />
          <!-- </KeepAlive> -->
          <!-- </Transition> -->
        </router-view>
        <router-view
          v-slot="{ Component }"
          name="LeftBar"
          class="view order-1 flex basis-1/5 bg-red-100"
        >
          <component :is="Component" />
        </router-view>
        <router-view
          v-slot="{ Component }"
          name="RightBar"
          class="view order-3 flex basis-1/5 bg-green-100"
        >
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </component>
</template>

<style></style>
