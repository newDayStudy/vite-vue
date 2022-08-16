import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./router.config";
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;

router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && !localStorage.getItem("isAuthenticated"))
    next({ path: "/login" });
  else next();
});
