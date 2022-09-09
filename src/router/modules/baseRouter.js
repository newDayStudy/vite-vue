export default [
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
        path: "/user",
        name: "user",
        component: () => import("@/views/UserCom.vue"),
      },
      {
        path: "/menu",
        name: "menu",
        component: () => import("@/views/menuCom.vue"),
      },
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
      {
        path: "/test",
        name: "test",
        component: () => import("@/views/TestCom.vue"),
      },
    ],
  },
];
