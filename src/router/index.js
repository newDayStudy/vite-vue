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
  if (!useUserStore.menus.length && localStorage.getItem("user")) {
    const routesObj = await useUserStore.getMenus();
    router.addRoute(routesObj);
  }
  // 记录ip地址
  useUserStore.getIP((ip) => {
    if (to.meta.pathname) {
      useUserStore.setIp({
        ip,
        pathname: to.meta.pathname,
        path: to.path,
      });
    }
  });
  if (to.name !== "login" && !localStorage.getItem("user")) {
    next({ name: "login" });
  } else if (
    (to.name == "login" || to.name == undefined) &&
    localStorage.getItem("user")
  ) {
    const path = location.hash.substring(1);
    if (path != "/home") {
      next({ path, replace: true });
    }
    next({ name: "home", replace: true });
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  nProgress.done();
});
