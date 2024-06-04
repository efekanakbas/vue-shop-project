<script setup lang="ts">
import { RouterLink } from 'vue-router'

const emit = defineEmits(['click'])
const props = defineProps<{ to: any; activeClass?: string }>() // sorry, not efficient in typescript

const handlerClick = ($ev: MouseEvent) => {
  emit('click', $ev)
}
const onLinkClick = (event: MouseEvent, navigate: (event: MouseEvent) => void) => {
  navigate(event) // vou router goto
  event.preventDefault()
  event.stopImmediatePropagation()
}

console.log('ACTİVE', props.activeClass)
</script>

<template>
  <RouterLink
    :to="props.to"
    :custom="true"
    v-slot="{ href, navigate }"
    @click="handlerClick"
    class="text-red-100"
    accesskey="text-blue-900"
    activeClass="text-blue-900"
  >
    <a
      activeClass="text-blue-900"
      :href="href"
      @click="
        ($ev) => {
          handlerClick($ev)
          onLinkClick($ev, navigate)
        }
      "
    >
      <slot></slot>
    </a>
  </RouterLink>
</template>
