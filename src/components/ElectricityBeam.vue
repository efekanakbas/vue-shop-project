<template>
  <svg ref="svgRef" width="200" height="200" class="relative">
    <defs>
      <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
        <feDropShadow dx="0" dy="0" stdDeviation="3" />
      </filter>
    </defs>
    <path style="filter: url(#glow)" d="M10,0 L100,0" stroke="black" stroke-width="2" />
  </svg>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const opts = {
  lineWidth: 1,
  numberOfPoints: 20,
  amplitude: 15,
  spacing: 10,
  marginX: 0,
  marginY: 10,
  fixedWidth: 320
}

const svgRef = ref<SVGSVGElement | null>(null)

onMounted(() => {
  const svg = svgRef.value
  if (!svg) return

  const width = opts.fixedWidth || (opts.numberOfPoints - 1) * opts.spacing + opts.marginX * 2
  const height = opts.amplitude + opts.marginY * 2

  svg.style.width = width + 'px'
  svg.style.height = height + 'px'

  const points = []
  for (let i = opts.numberOfPoints; i--; ) points.push(i)

  const animate = () => {
    const coords = points.map((n) => {
      const first = n == 0
      const last = n == opts.numberOfPoints - 1
      const x = ((width - opts.marginX * 2) / (opts.numberOfPoints - 1)) * n + opts.marginX
      const y =
        first || last ? height / 2 : (height - opts.amplitude) / 2 + Math.random() * opts.amplitude

      return { x, y }
    })

    const path = svg.querySelector('path')
    if (path) {
      path.setAttribute('d', 'M' + coords.map((coord) => coord.x + ',' + coord.y).join(' L'))
      path.style.opacity = (Math.random() * (5 - 2) + 2) / 5 + 0.2
      path.style.strokeWidth = opts.lineWidth.toString()
    }

    const glow = svg.querySelector('#glow feDropShadow')
    if (glow) {
      glow.setAttribute('stdDeviation', (Math.random() * (5 - 2) + 2).toString())
    }

    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
})
</script>

<style scoped>
svg {
  align-self: center;
  width: 200px;
  height: 100px;
}
path {
  stroke: #00ffff;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
#glow feDropShadow {
  flood-color: #b7daff;
}
html,
body {
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #110d11;
}
</style>
