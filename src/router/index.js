import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router.config'
import NProgress from 'nprogress'
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach((to, from, next) => {
  NProgress.done()
})
export default router