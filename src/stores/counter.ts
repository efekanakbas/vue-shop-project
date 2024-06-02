import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0)
    const cart = ref([])
    const total = ref(0)

    const handleResetCart = () => {
      cart.value = []
      updateTotal()
    }

    const handleIncCount = () => {
      count.value++
    }

    const updateTotal = () => {
      console.log('UPDADADADA')
      total.value = cart.value.reduce((acc, item) => {
        //@ts-expect-error
        return acc + item.price * item.number
      }, 0)
    }

    const totalHandleInc = (value: any) => {
      total.value += value
    }

    const totalHandleDec = (value: any) => {
      total.value = total.value - value
    }

    function $reset() {
      count.value = 0
      cart.value = []
      total.value = 0
    }

    function addToCart(item: any, number: number) {
      const existingItem = cart.value.find((el) => el.id === item.id)

      if (existingItem) {
        if (existingItem.number >= 11 || existingItem.number + number >= 11) {
          throw new Error('Daha fazla ekleyemezsiniz')
        } else {
          existingItem.number += number
        }
      } else {
        cart.value.push({ ...item, number })
      }
      updateTotal()
    }

    function deleteFromCart(item: any) {
      const existingItem = cart.value.find((el) => el.id === item.id)

      if (existingItem) {
        cart.value = cart.value.filter((el) => el !== existingItem)
        updateTotal()
      }
    }

    return {
      count,
      $reset,
      cart,
      addToCart,
      total,
      deleteFromCart,
      handleResetCart,
      handleIncCount,
      totalHandleInc,
      totalHandleDec,
      updateTotal
    }
  },
  { persist: true }
)
