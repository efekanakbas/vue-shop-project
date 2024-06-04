<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useDark } from '@vueuse/core'

const props = defineProps<WithClassAsProps>()

const isDark = useDark()

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    aria-label="Next button"
    role="button"
    :disabled="!canScrollNext"
    :class="
      cn(
        'touch-manipulation absolute h-8 w-8 rounded-full p-0',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
        { 'next-button-dark-mode': isDark }
      )
    "
    variant="outline"
    @click="scrollNext"
  >
    <slot>
      <ArrowRight alt="next button" class="h-4 w-4 text-current" />
    </slot>
  </Button>
</template>

<style scoped>
.next-button-dark-mode {
  background-color: rgb(15 23 42);
}
</style>
