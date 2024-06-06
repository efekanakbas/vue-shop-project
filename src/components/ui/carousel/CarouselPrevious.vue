<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useDark } from '@vueuse/core'
import { useMediaQuery } from '@vueuse/core'

const isDesktop = useMediaQuery('(min-width: 1024px)')

const props = defineProps<WithClassAsProps>()

const isDark = useDark()

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    aria-label="Previous button"
    role="button"
    :disabled="!canScrollPrev"
    v-if="!isDesktop || canScrollPrev"
    :class="
      cn(
        'touch-manipulation absolute h-8 w-8 lg:w-10 lg:h-10 rounded-full p-0 shadow-md',
        orientation === 'horizontal'
          ? 'lg:left-2 -left-9 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
        { 'previous-button-dark-mode': isDark }
      )
    "
    variant="outline"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeft alt="previous button" class="h-4 w-4 text-current" />
    </slot>
  </Button>
</template>

<style scoped>
.previous-button-dark-mode {
  background-color: rgb(15 23 42);
}
</style>
