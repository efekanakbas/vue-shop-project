<script setup>
import { ref, onMounted } from 'vue'
import lightGallery from 'lightgallery'
import lgZoom from 'lightgallery/plugins/zoom'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'

const props = defineProps({
  data: Array
})

const mappedArray = ref([])

onMounted(() => {
  props.data?.forEach((item) => {
    mappedArray.value.push({
      src: item.image,
      subHtml: `<div  class="lightGallery-captions text-shadow-class">
                    <h4>${item.title}</h4>
                    <p>${item.category}</p>
                </div>`
    })
  })
})

console.log('LOLOLO', mappedArray.value)

const images = ref(mappedArray.value)
const currentIndex = ref(0)

const currentSlide = ref(0)
let galleryInstance = null

onMounted(() => {
  const $lgContainer = document.getElementById('inline-gallery-container')

  galleryInstance = lightGallery($lgContainer, {
    container: $lgContainer,
    dynamic: true,
    hash: false,
    closable: false,
    showMaximizeIcon: true,
    appendSubHtmlTo: '.lg-item',
    slideDelay: 400,
    plugins: [lgZoom, lgThumbnail],
    dynamicEl: images.value,
    thumbWidth: 10,
    thumbHeight: '10px',
    thumbMargin: 10,
    thumbnail: true
  })

  $lgContainer.addEventListener('lgBeforeSlide', (event) => {
    currentIndex.value = event.detail.index

    currentSlide.value = event.detail.index
  })

  setTimeout(() => {
    galleryInstance.openGallery()
  }, 200)
})

const isPointerMoved = ref(false)
const isWrapClicked = ref(false)

// const nextButton = ref()
// const prevButton = ref()
const wrap = ref()

onMounted(() => {
  wrap.value = document.getElementsByClassName('lg-inner')[0]
  wrap.value.classList.add('cursor-pointer')

  if (wrap.value) {
    wrap.value.addEventListener('mousedown', () => {
      isWrapClicked.value = true
      console.log('Wrap clicked1')
    })
  }
  if (wrap.value) {
    wrap.value.addEventListener('mouseup', () => {
      isWrapClicked.value = false
      console.log('Wrap clicked2')
    })
  }
  if (wrap.value) {
    wrap.value.addEventListener('mouseleave', () => {
      isWrapClicked.value = false
      console.log('Wrap clicked3')
    })
  }
})
</script>

<template>
  <div
    @pointerdown="isPointerMoved = false"
    @pointermove="isPointerMoved = true"
    @pointerup="
      () => {
        // if point moved, don't do any thing
        if (isPointerMoved) {
          isPointerMoved = true
          return
        }
        //if point haven't moved, handle the click event as you wish
        if (isWrapClicked) {
          $router.push({
            name: 'product',
            params: { id: data[currentIndex].id }
          })
        }
      }
    "
    class="d-flex justify-content-center select-none"
  >
    {{ isWrapClicked }}
    <div id="inline-gallery-container" class="inline-gallery-container"></div>
  </div>
</template>

<style>
.inline-gallery-container {
  width: 700px;
  height: 500px;
  position: relative;
}

.lightGallery-captions {
  h4 {
    transform: translate3d(60px, 0, 0px);
  }
  p {
    transform: translate3d(-60px, 0, 0px);
  }
  h4,
  p {
    opacity: 0;
  }
}

.lg-current {
  .lightGallery-captions {
    h4,
    p {
      transform: translate3d(0, 0, 0px);
    }
    h4,
    p {
      opacity: 1;
    }
  }
}
.lg-slide-progress {
  .lightGallery-captions {
    h4 {
      transform: translate3d(-60px, 0, 0px);
    }
    p {
      transform: translate3d(60px, 0, 0px);
    }
    h4,
    p {
      opacity: 0;
    }
  }
}

.lightGallery-captions {
  h4,
  p {
    transition:
      transform 0.4s ease-in-out,
      opacity 0.4s ease-in;
  }
}
.lg-current {
  .lightGallery-captions {
    h4,
    p {
      transition-delay: 500ms;
    }
  }
  &.lg-slide-progress {
    .lightGallery-captions {
      h4,
      p {
        transition-delay: 0ms;
      }
    }
  }
}
.lg-thumb-item {
  background-color: white;
}

.lg-outer .lg-thumb-item {
  border-color: white;
  background-color: white;
}

.lg-outer .lg-thumb-item:hover {
  border-color: #f97316;
}

.lg-outer .lg-thumb-item.active {
  border-color: white;
  background-color: #f97316;
}

.text-shadow-class {
  text-shadow:
    -1px 0 black,
    0 1px black,
    1px 0 black,
    0 -1px black;
}

.lg-outer .lg-thumb-outer.lg-grab .lg-thumb-item {
  cursor: pointer;
}
</style>
