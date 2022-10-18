import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home_psycho/:id',
    name: 'home-psycho',
    component: () => import('../components/psychologists/homepage-psychologist')
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
    path: '/home_psycho/:id/profile_psycho',
    name: 'psychologist-profile',
    component: () => import('../components/psychologists/psychologist-profile')
  },
  {
    path: '/dashboard_patient/:id',
    name: 'dashboard_psycho',
    component: () => import('../components/patients/patient-dashboard')
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
    path: '/dashboard_psycho/:id',
    name: 'dashboard_patient',
    component: ()=> import('../components/psychologists/list-psychologists')
  },
  {
    path: '/login_psycho',
    name: 'psychologist-login',
    component: () => import('../components/psychologists/login-psychologist')
  },
  {
    path: '/register_psycho',
    name: 'psychologist-register',
    component: () => import('../components/psychologists/register-psychologist')
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
    path: '/logbook_psychologist/:psycho_id/patient/:patient_id',
    name: 'psychologist-logbook',
    component: ()=> import('../components/psychologists/psychologist-logbook')
  },
  {
    path: '/appointments-psycho/:id',
    name: 'psychologist-appointments',
    component: ()=> import('../components/psychologists/appointments-psycho')
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
