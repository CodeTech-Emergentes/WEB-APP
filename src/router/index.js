import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home_psycho',
    name: 'home-psycho',
    component: () => import('../components/nutritionists/homepage-nutritionist')
  },
  {
    path:'/home_patient/:id',
    name: 'home-patient',
    component: () => import('../components/patients/homepage-patient')
  },

  {
    path: '/home_patient/:id/profile_patient',
    name: 'patient-profile',
    component: () => import('../components/patients/patient-profile')
  },
  {
    path: '/home_psycho/profile_psycho',
    name: 'psychologist-profile',
    component: () => import('../components/nutritionists/nutritionist-profile')
  },
  {
    path: '/dashboard_patient',
    name: 'dashboard_psycho',
    component: () => import('../components/nutritionists/patient-dashboard')
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../components/page-error/errorpage')
  },
  {
    path: '/video-call',
    name: 'videoCall',
    component: () => import('../components/video-call/video-call')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard_psycho',
    name: 'dashboard_patient',
    component: ()=> import('../components/patients/list-psychologists')
  },
  {
    path: '/login_psycho',
    name: 'psychologist-login',
    component: () => import('../components/nutritionists/login-nutritionist')
  },
  {
    path: '/register_psycho',
    name: 'psychologist-register',
    component: () => import('../components/nutritionists/register-nutritionist')
  },
  {
    path: '/login_patient',
    name: 'Login-Patient',
    component: () => import('../components/patients/login-patient')
  },
  {
    path: '/register_patient',
    name: 'Sign-up-Patient',
    component: () => import('../components/patients/signup-patient')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  // {
  //   path: '/checkout/:id/:idPsycho/:idSchedule',
  //   name: 'checkout',
  //   component: () => import('../components/checkout/payment')
  // },
  {
    path: '/publication/:id',
    name: 'patient-publication',
    component: () => import('../components/patients/patient-publication')
  },
  {
    path: '/logbook_psychologist/patient',
    name: 'psychologist-logbook',
    component: ()=> import('../components/nutritionists/nutritionist-logbook')
  },
  {
    path: '/appointments-psycho',
    name: 'psychologist-appointments',
    component: ()=> import('../components/nutritionists/appointments-nutritionist')
  },
  {
    path: '/appointments-patient/:id',
    name: 'patient-appointments',
    component: ()=> import('../components/patients/appointments-patient')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
