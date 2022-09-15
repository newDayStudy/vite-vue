import { createRouter, createWebHashHistory } from "vue-router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
nProgress.inc(0.2);
nProgress.configure({ easing: "ease", speed: 500, showSpinner: false });
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
import { userStore } from "@/store";

router.beforeEach(async (to, from, next) => {
  nProgress.start();
  const useUserStore = userStore();
  if (!useUserStore.menus.length) {
    const routesObj = await useUserStore.getMenus();
    router.addRoute(routesObj);
  }
  if (to.name !== "login" && !localStorage.getItem("isAuthenticated")) {
    next({ name: "login" });
  } else if (
    (to.name == "login" || to.name == undefined) &&
    localStorage.getItem("isAuthenticated")
  ) {
    next({ name: "home", replace: true });
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  nProgress.done();
});
