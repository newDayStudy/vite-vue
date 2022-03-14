export default [
  {
    path: '',
    component: () => import('@/components/HelloWorld.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  }
]