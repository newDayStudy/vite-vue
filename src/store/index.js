import { defineStore } from "pinia";
import { getMenuByUserId } from "@/apis";
const modules = import.meta.glob("../views/**.vue");
export const userStore = defineStore("user", {
  state: () => {
    return {
      isAuthenticated: localStorage.getItem("isAuthenticated") || false,
      menus: [],
    };
  },
  actions: {
    bindUser(isAuthenticated) {
      this.isAuthenticated = isAuthenticated;
    },
    async getMenus() {
      try {
        const res = await getMenuByUserId({
          id: 1,
        });
        this.menus = res.data;
        const routeObj = {
          path: "/home",
          name: "home",
          component: () => import("@/views/HomeCom.vue"),
          children: [],
        };
        const flat = res.data.reduce((prev, cur) => {
          return prev.concat(cur.children);
        }, []);
        flat
          .filter((item) => item.path)
          .forEach((item) => {
            routeObj.children.push({
              path: item.path,
              name: item.code,
              component: modules[`../views/${item.filepath}.vue`],
            });
          });
        console.log(routeObj);
        return routeObj;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
