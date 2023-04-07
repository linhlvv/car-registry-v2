import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/logAndReg',
      name: 'LoginAndRegister',
      components: {
        default: () => import('@/pages/Auth.vue'),
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/components/auth/Login.vue'),
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/components/auth/Register.vue'),
        },
      ]
    },
    {
      path: '/',
      component: () => import('@/layout/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/pages/Home.vue'),
        },
        {
          path: 'accountManagement',
          name: 'AccountManagement',
          component: () => import('@/pages/AccountManagement.vue'),
          meta: { transition: 'slide-fade' },
        },
        {
          path: 'center/:id',
          name: 'CenterProfile',
          component: () => import('@/pages/CenterProfile.vue'),
          meta: { transition: 'scale' },
        },
        {
          path: 'registedCars',
          name: 'RegistedCars',
          component: () => import('@/pages/RegistedCars.vue'),
          meta: { transition: 'slide-fade' },
        },
        {
          path: 'forecast',
          name: 'Forecast',
          component: () => import('@/pages/Forecast.vue'),
          meta: { transition: 'scale' },
        },
        {
          path: 'expiredCars',
          name: 'ExpiredCars',
          component: () => import('@/pages/ExpiredCars.vue'),
        },
        {
          path: 'manageDatabase',
          name: 'ManageDatabase',
          component: () => import('@/pages/ManageDatabase.vue'),
        },
        {
          path: 'owner/:id',
          name: 'CarOwnerProfile',
          component: () => import('@/pages/CarOwnerProfile.vue'),
          meta: { transition: 'scale' },
        },
        {
          path: 'cars',
          name: 'Cars',
          component: () => import('@/pages/Cars.vue'),
          meta: { transition: 'scale' },
        },
        {
          path: 'notRegistedCars',
          name: 'NotRegistedCars',
          component: () => import('@/pages/NotRegistCars.vue'),
          meta: { transition: 'scale' },
        },
        {
          path: 'registNewCar',
          name: 'RegistNewCar',
          component: () => import('@/pages/RegistNewCar.vue'),
        },
      ]
    },
  ]
})

export default router
