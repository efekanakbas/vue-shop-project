import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const cart = ref([])
    const total = ref(0)
    //@ts-expect-error
    const queue = []
    let isProcessing = false

    const handleResetCart = () => {
      cart.value = []
      updateTotal()
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
      cart.value = []
      total.value = 0
    }

    async function processQueue() {
      if (isProcessing || queue.length === 0) {
        return
      }

      isProcessing = true
      //@ts-expect-error
      const { item, number, myIf, resolve, reject } = queue.shift()

      try {
        //@ts-expect-error
        const existingItem = await cart.value.find((el) => el.id === item.id)

        if (existingItem) {
          //@ts-expect-error
          const numberofItem = existingItem.number
          const computedNumber = number - numberofItem
          console.log('COMPUTED', computedNumber)

          //@ts-expect-error
          if (existingItem.number >= 11 || existingItem.number + number >= 11) {
            throw new Error('Daha fazla ekleyemezsiniz')
          } else {
            if (!myIf) {
              //@ts-expect-error
              existingItem.number += number
            }
          }
        } else {
          //@ts-expect-error
          await cart.value.push({ ...item, number })
        }
        await updateTotal()
        resolve()
      } catch (error) {
        reject(error)
      } finally {
        isProcessing = false

        processQueue()
      }
    }

    //@ts-expect-error
    async function addToCart(item, number, myIf = false) {
      return new Promise((resolve, reject) => {
        queue.push({ item, number, myIf, resolve, reject })
        processQueue()
      })
    }

    function deleteFromCart(item: any) {
      //@ts-expect-error
      const existingItem = cart.value.find((el) => el.id === item.id)

      if (existingItem) {
        cart.value = cart.value.filter((el) => el !== existingItem)
        updateTotal()
      }
    }

    return {
      $reset,
      cart,
      addToCart,
      total,
      deleteFromCart,
      handleResetCart,
      totalHandleInc,
      totalHandleDec,
      updateTotal
    }
  },
  { persist: true }
)
