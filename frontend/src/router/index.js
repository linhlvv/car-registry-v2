import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/log-and-reg',
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
          path: 'account-management',
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
          path: 'forecast',
          name: 'Forecast',
          component: () => import('@/pages/Forecast.vue'),
          meta: { transition: 'scale' },
        },
        {
          path: 'manage-database',
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
          path: 'regist-new-car',
          name: 'RegistNewCar',
          component: () => import('@/pages/RegistNewCar.vue'),
        },
        {
          path: 'statistics',
          name: 'Statistics',
          component: () => import('@/pages/Statistics.vue'),
        },
      ]
    },
  ]
})

export default router
