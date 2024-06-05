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
import { ScrollArea } from '@/components/ui/scroll-area'
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
  <div class="flex justify-center items-center h-full overflow-hidden">
    <Card class="w-full lg:w-2/5">
      <CardHeader class="flex justify-center w-full bg-slate-100 dark:bg-slate-900 rounded-t-lg">
        <CardTitle class="mx-auto text-orange-500">{{ $t('auth.register.title') }}</CardTitle>
        <CardDescription class="mx-auto text-orange-400">{{
          $t('auth.register.subtitle')
        }}</CardDescription>
      </CardHeader>
      <CardContent class="p-0 rounded-t-sm h-[400px] lg:h-[673px]">
        <ScrollArea class="h-full shadow-none rounded-b-lg">
          <form class="space-y-6 bg-orange-100 dark:bg-orange-950 p-7 pb-5" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="username">
              <FormItem v-auto-animate>
                <FormLabel>{{ $t('auth.register.username.title') }}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Username" v-bind="componentField" />
                </FormControl>
                <FormDescription>
                  {{ $t('auth.register.username.bottomMessage') }}
                </FormDescription>
                <FormMessage v-if="touchedUsername" />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="email">
              <FormItem v-auto-animate>
                <FormLabel>{{ $t('auth.email.title') }}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="E-mail" v-bind="componentField" />
                </FormControl>
                <FormDescription> {{ $t('auth.email.bottomMessage') }} </FormDescription>
                <FormMessage v-if="touchedEmail" />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem v-auto-animate>
                <FormLabel>{{ $t('auth.password.title') }}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" v-bind="componentField" />
                </FormControl>
                <FormDescription> {{ $t('auth.password.bottomMessage') }} </FormDescription>
                <FormMessage v-if="touchedPassword" />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="confirm">
              <FormItem v-auto-animate>
                <FormLabel>{{ $t('auth.register.confirm.title') }}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" v-bind="componentField" />
                </FormControl>
                <FormDescription> {{ $t('auth.register.confirm.bottomMessage') }} </FormDescription>
                <FormMessage v-if="touchedConfirm" />
              </FormItem>
            </FormField>
            <div class="space-y-6">
              <Button type="submit" class="w-full"> {{ $t('button.submit') }} </Button>
              <Separator class="dark:bg-white translate-y-2" />
              <Button as-child class="w-full dark:text-white" type="button" variant="link">
                <RouterLink to="/auth/login"> {{ $t('auth.register.link') }}</RouterLink>
              </Button>
            </div>
          </form>
        </ScrollArea>
      </CardContent>
    </Card>
  </div>
</template>

<style></style>
