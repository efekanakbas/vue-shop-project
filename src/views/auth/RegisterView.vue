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
//~

//! Reactivity
const max = 'You can type max 20 characters'
const formSchema = toTypedSchema(
  z
    .object({
      username: z.string().min(2).max(50),
      email: z.string().min(2).max(50).email('You have to type a valid email'),
      password: z.string().min(1).max(20, max),
      confirm: z.string().min(1).max(20, max)
    })
    .refine((data) => data.password === data.confirm, {
      message: 'Passwords must match',
      path: ['confirm'] // This sets the error message path to "confirm"
    })
)
//!

//^ Handlers
const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  window.alert(values)
})

const touchedUsername = useIsFieldTouched('username')
const touchedEmail = useIsFieldTouched('email')
const touchedPassword = useIsFieldTouched('password')
const touchedConfirm = useIsFieldTouched('confirm')
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
    <Card class="w-2/5">
      <CardHeader class="flex justify-center w-full bg-slate-100">
        <CardTitle class="mx-auto text-orange-500">Register Form</CardTitle>
        <CardDescription class="mx-auto text-orange-400"
          >Register for dive into productions</CardDescription
        >
      </CardHeader>
      <CardContent class="p-0 rounded-t-sm">
        <form class="space-y-6 bg-orange-100 p-7" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem v-auto-animate>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Username" v-bind="componentField" />
              </FormControl>
              <FormDescription> You have to type username here </FormDescription>
              <FormMessage v-if="touchedUsername" />
            </FormItem>
          </FormField>
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
          <FormField v-slot="{ componentField }" name="confirm">
            <FormItem v-auto-animate>
              <FormLabel>Confirm</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" v-bind="componentField" />
              </FormControl>
              <FormDescription> You have to type confirm here. </FormDescription>
              <FormMessage v-if="touchedConfirm" />
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full"> Submit </Button>
          <Separator style="margin-top: 40px" />
          <Button as-child class="w-full" type="button" variant="link">
            <RouterLink to="/auth/login"> You are already cool? </RouterLink>
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<style></style>
