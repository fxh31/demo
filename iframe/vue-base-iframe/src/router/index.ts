import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import("../views/index.vue")
    },
    {
      path: '/crossOrigin',
      name: 'CrossOrigin',
      component: () => import("../views/crossOrigin/index.vue")
    },
    {
      path: '/sameOrigin',
      name: 'SameOrigin',
      component: () => import("../views/sameOrigin/index.vue"),
    },
    {
      path: "/sameOriginPage",
      name: 'SameOriginPage',
      component: () => import("../views/sameOrigin/sameOrigin.vue")
    }
  ]
})

export default router
