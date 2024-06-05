<script lang="ts" setup>
//~ Imports
import { useRoute } from 'vue-router'
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

//@ts-expect-error
import { supabase } from '@/lib/supabaseClient.ts'
import { ScrollArea } from '@/components/ui/scroll-area'

const isModal = defineProps<{
  width: string
  handleClose: () => void
}>()
//~

//! Reactivity
const max = 'You can type max 20 characters'
const min = 'You can type min 2 characters'
const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(2, min).max(50).email('You have to type a valid email'),
    password: z.string().min(1).max(20, max)
  })
)
const router = useRouter()
const route = useRoute()
//!

//^ Handlers

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const handleLogin = () => {
  localStorage.setItem('loggedIn', 'true')
  if (isModal.width) {
    isModal.handleClose()
    window.location.reload()
  } else {
    router.push({ name: 'home' })
  }
}

const onSubmit = handleSubmit(() => {
  handleLogin()
})

const touchedEmail = useIsFieldTouched('email')
const touchedPassword = useIsFieldTouched('password')

const signInWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: import.meta.env.VITE_APP_URI + route.fullPath
      }
    })

    if (error) {
      console.error('Login hatası:', error.message)
    }

    localStorage.setItem('loggedIn', 'true')
    if (isModal.width) {
      isModal.handleClose()
    }
  } catch (error: any) {
    console.error('Bir hata oluştu:', error.message)
  }
}

const signInWithGitHub = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: import.meta.env.VITE_APP_URI + route.fullPath
      }
    })

    if (error) {
      console.error('Login hatası:', error.message)
    }

    localStorage.setItem('loggedIn', 'true')
    if (isModal.width) {
      isModal.handleClose()
    }
  } catch (error: any) {
    console.error('Bir hata oluştu:', error.message)
  }
}

//^

//& Routes

//&

//? Watches

//?

//* consoleLogs
console.log('ROUTE', route.fullPath)
//*
</script>

<template>
  <div class="flex justify-center items-center">
    <Card class="rounded-lg" :class="width ? width : ' w-full lg:w-2/5'">
      <CardHeader class="flex justify-center w-full rounded-t-lg bg-slate-100 dark:bg-slate-900">
        <CardTitle class="mx-auto text-orange-500">{{ $t('auth.login.title') }}</CardTitle>
        <CardDescription class="mx-auto text-orange-400">{{
          $t('auth.login.subtitle')
        }}</CardDescription>
      </CardHeader>
      <CardContent class="p-0 rounded-t-sm h-[400px] lg:h-[550px] bg-orange-100 dark:bg-orange-950">
        <ScrollArea class="h-full shadow-none rounded-b-lg">
          <div class="flex items-center justify-center gap-8 my-8 lg:gap-12">
            <button
              class="bg-orange-200 w-[60px] h-[60px] lg:w-[120px] lg:h-[60px] flex justify-center items-center rounded-lg dark:bg-orange-900 transition-colors duration-300 hover:bg-orange-300 dark:hover:bg-orange-800"
              type="button"
              @click="signInWithGoogle"
            >
              <img src="@/assets/google-logo.svg" alt="Google logo" />
            </button>
            <button
              class="bg-orange-200 w-[60px] h-[60px] lg:w-[120px] lg:h-[60px] flex justify-center items-center rounded-lg dark:bg-orange-900 transition-colors duration-300 hover:bg-orange-300 dark:hover:bg-orange-800"
              type="button"
              @click="
                () => {
                  signInWithGitHub()
                  console.log('DOĞRU TIKLADIN')
                }
              "
            >
              <img src="@/assets/github-logo.svg" alt="github logo" />
            </button>
          </div>
          <Separator class="dark:bg-white mx-auto w-[calc(100%-56px)]" />
          <form class="space-y-6 p-7 pb-5" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem v-auto-animate>
                <FormLabel>{{ $t('auth.email.title') }}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="E-mail" v-bind="componentField" />
                </FormControl>
                <FormDescription> {{ $t('auth.email.bottomMessage') }}</FormDescription>
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
            <div class="space-y-6">
              <Button type="submit" class="w-full"> {{ $t('button.submit') }} </Button>
              <Separator class="dark:bg-white translate-y-2" />
              <Button as-child class="w-full dark:text-white bg" type="button" variant="link">
                <RouterLink to="/auth/register"> {{ $t('auth.login.link') }} </RouterLink>
              </Button>
            </div>
          </form>
        </ScrollArea>
      </CardContent>
    </Card>
  </div>
</template>

<style></style>
