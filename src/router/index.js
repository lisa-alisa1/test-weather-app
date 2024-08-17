import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '../views/pages/HomePage.vue'
import FavoritesPage from '../views/pages/FavoritesPage.vue'

const routes = [
    { 
      path: '/', 
      component: HomePage,
      name: 'HomePage'
    },
    { 
      path: '/favorites', 
      component: FavoritesPage,
      name: 'FavoritesPage'
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router