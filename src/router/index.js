import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router.config'
export default createRouter({
  history: createWebHashHistory(),
  routes: routes
})