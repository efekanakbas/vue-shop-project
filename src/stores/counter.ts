import { ref, computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0)
    const cart = ref([])

    const allCost = computed(() => {
      return cart.value.reduce((total, item) => {
        //@ts-expect-error
        const totalValue = total + item.price * item.number
        return parseFloat(totalValue.toFixed(2))
      }, 0)
    })
    const total = ref(0)
    // allCost değiştiğinde total'i güncellemek için watch kullanıyoruz
    watch(
      allCost,
      (newVal) => {
        total.value = newVal
      },
      { once: true }
    )
    const totalHandleInc = (value: any) => {
      total.value += value
    }

    const totalHandleDec = (value: any) => {
      console.log('DECLENDİN')
      total.value -= value
    }

    function $reset() {
      count.value = 0
      cart.value = []
      total.value = 0
    }

    function addToCart(item: object, number: number) {
      //@ts-expect-error
      const existingItem = cart.value.find((el) => el.id === item.id)

      if (existingItem) {
        //@ts-expect-error
        if (existingItem.number >= 11 || existingItem.number + number >= 11) {
          throw new Error('Daha fazla ekleyemezsiniz')
        } else {
          //@ts-expect-error
          existingItem.number += number
        }
      } else {
        item = { ...item, number }
        //@ts-expect-error
        cart.value.push(item)
        count.value++
      }
    }

    return { count, $reset, cart, addToCart, allCost, total, totalHandleInc, totalHandleDec }
  },
  { persist: true }
)
