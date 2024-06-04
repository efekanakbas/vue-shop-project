<script lang="ts" setup>
//~ Imports
import { useForm, useIsFieldTouched } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const isModal = defineProps<{
  width: string
  handleClose: () => void
}>()
//~

//! Reactivity
const max = 'You can type max 20 characters'
const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(2).max(50).email('You have to type a valid email'),
    password: z.string().min(1).max(20, max)
  })
)
const router = useRouter()
const store = useAuthStore()

//!

//^ Handlers

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit(() => {
  localStorage.setItem('loggedIn', 'true')
  if (isModal.width) {
    store.handleAuth()
    isModal.handleClose()
  } else {
    store.handleAuth()
    router.push({ name: 'home' })
  }
})

const touchedEmail = useIsFieldTouched('email')
const touchedPassword = useIsFieldTouched('password')
//^

//& Routes

//&

//? Watches

//?

//* consoleLogs

//*
</script>

<template>
  <div class="flex justify-center items-center">
    <Card class="rounded-lg" :class="width ? width : ' w-full lg:w-2/5'">
      <CardHeader class="flex justify-center w-full rounded-t-lg bg-slate-100 dark:bg-slate-900">
        <CardTitle class="mx-auto text-orange-500">Login Form</CardTitle>
        <CardDescription class="mx-auto text-orange-400">Login for interactions</CardDescription>
      </CardHeader>
      <CardContent class="p-0">
        <form
          class="space-y-6 bg-orange-100 rounded-b-lg w-full h-full dark:bg-orange-950 p-7"
          @submit="onSubmit"
        >
          <FormField v-slot="{ componentField }" name="email">
            <FormItem v-auto-animate>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input type="text" placeholder="E-mail" v-bind="componentField" />
              </FormControl>
              <FormDescription> You have to type E-mail here </FormDescription>
              <FormMessage v-if="touchedEmail" />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem v-auto-animate>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" v-bind="componentField" />
              </FormControl>
              <FormDescription> You have to type password here. </FormDescription>
              <FormMessage v-if="touchedPassword" />
            </FormItem>
          </FormField>
          <div class="space-y-6">
            <Button type="submit" class="w-full"> Submit </Button>
            <Separator class="dark:bg-white translate-y-2" />
            <Button as-child class="w-full dark:text-white bg" type="button" variant="link">
              <RouterLink to="/auth/register"> Are you new here? </RouterLink>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<style></style>
