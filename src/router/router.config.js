export default [
  {
    path: '/',
    component: () => import('@/views/Form.vue')
  },
  {
    path: '/activity',
    component: () => import('@/views/Activity.vue')
  },
  {
    path: '/activityRules',
    component: () => import('@/views/ActivityRules.vue')
  },
  {
    path: '/startRace',
    component: () => import('@/views/StartRace.vue')
  },
  {
    path: '/endRace',
    component: () => import('@/views/EndRace.vue')
  },
  {
    path: '/raceRank',
    component: () => import('@/views/RaceRank.vue')
  }
]