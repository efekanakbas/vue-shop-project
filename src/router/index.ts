import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import RestLayout from '@/layouts/RestLayout.vue'
const LeftBar = () => import('@/components/side-bars/LeftBar.vue')
const RightBar = () => import('@/components/side-bars/RightBar.vue')
import { authRoutes } from '@/routes'
import { isAuthenticated } from '@/apis/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        layout: '-'
      }
    },
    {
      path: '/auth',

      children: [
        { path: '', redirect: '/auth/login' },
        { path: '/login', redirect: '/auth/login' },
        { path: '/register', redirect: '/auth/register' },
        {
          name: 'login',
          components: {
            default: () => import('@/views/auth/LoginView.vue')
          },
          path: 'login'
        },
        {
          name: 'register',
          components: {
            default: () => import('@/views/auth/RegisterView.vue')
          },
          path: 'register'
        }
      ],
      meta: {
        layout: AuthLayout
      }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: RestLayout
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        layout: RestLayout
      }
    },
    {
      path: '/category',
      children: [
        {
          path: '',
          redirect: '/'
        },
        {
          path: 'men',
          name: 'men',
          components: {
            default: () => import('@/views/category/MenView.vue')
          }
        },
        {
          path: 'women',
          name: 'women',
          components: {
            default: () => import('@/views/category/WomenView.vue')
          }
        },
        {
          path: 'electronics',
          name: 'electronics',
          components: {
            default: () => import('@/views/category/ElectronicsView.vue')
          }
        },
        {
          path: 'jewelery',
          name: 'jewelery',
          components: {
            default: () => import('@/views/category/JeweleryView.vue')
          }
        }
      ],
      meta: {
        layout: RestLayout
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
      meta: {
        layout: RestLayout
      }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
      props: true,
      meta: {
        layout: RestLayout
      }
    }
  ]
})

export default router

router.beforeEach((to, from) => {
  // if (!isAuthenticated() && !authRoutes.includes(to.fullPath)) {
  //   return { name: 'login' }
  // }
  // console.log('isAuth', isAuthenticated())
  if (isAuthenticated() && authRoutes.includes(to.fullPath)) {
    return { name: 'home' }
  } else {
    return
  }
})
