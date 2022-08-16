export default [
  {
    path: "/hello",
    name: "hello",
    component: () => import("@/components/HelloWorld.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginCom.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/HomeCom.vue"),
    children: [
      {
        path: "/calendar",
        name: "calendar",
        component: () => import("@/views/CalendarCom.vue"),
      },
      {
        path: "/table",
        name: "table",
        component: () => import("@/views/TableCom.vue"),
      },
      {
        path: "/form",
        name: "form",
        component: () => import("@/views/FormCom.vue"),
      },
      {
        path: "/question",
        name: "question",
        component: () => import("@/views/QuestionCom.vue"),
      },
    ],
  },
];
