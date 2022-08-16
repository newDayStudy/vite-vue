export default [
  {
    path: "",
    redirect: "/home",
  },
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
  {
    path: "/calendar",
    component: () => import("@/views/CalendarCom.vue"),
  },
  {
    path: "/table",
    component: () => import("@/views/TableCom.vue"),
  },
  {
    path: "/form",
    component: () => import("@/views/FormCom.vue"),
  },
  {
    path: "/question",
    component: () => import("@/views/QuestionCom.vue"),
  },
];
