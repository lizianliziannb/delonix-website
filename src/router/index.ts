import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue'),
    },
    {
      path: '/brands',
      name: 'Brands',
      component: () => import('../views/Brands.vue'),
    },
    {
      path: '/advantages',
      name: 'Advantages',
      component: () => import('../views/Advantages.vue'),
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('../views/News.vue'),
    },
    {
      path: '/cooperation',
      name: 'Cooperation',
      component: () => import('../views/Cooperation.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
