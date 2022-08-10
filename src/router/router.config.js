export default [
  {
    path: "/hello",
    component: () => import("@/components/HelloWorld.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/LoginCom.vue"),
  },
  {
    path: "/home",
    component: () => import("@/views/HomeCom.vue"),
  },
];
