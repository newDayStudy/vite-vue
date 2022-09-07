import { createRouter, createWebHashHistory } from "vue-router";
const files = import.meta.globEager("./modules/*.js");
let routes = [];
Object.keys(files).forEach((key) => {
  routes = routes.concat(files[key].default);
});
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !localStorage.getItem("isAuthenticated")) {
    next({ name: "login" });
  } else if (
    (to.name == "login" || to.name == undefined) &&
    localStorage.getItem("isAuthenticated")
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});
