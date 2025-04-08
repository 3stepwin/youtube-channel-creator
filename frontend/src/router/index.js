import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChannelCreator from '../views/ChannelCreator.vue'
import ApiSettings from '../views/ApiSettings.vue'
import Results from '../views/Results.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/creator',
    name: 'ChannelCreator',
    component: ChannelCreator
  },
  {
    path: '/api-settings',
    name: 'ApiSettings',
    component: ApiSettings
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
