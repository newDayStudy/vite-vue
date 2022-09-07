import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => {
    return {
      isAuthenticated: localStorage.getItem("isAuthenticated") || false,
    };
  },
  actions: {
    bindUser(isAuthenticated) {
      this.isAuthenticated = isAuthenticated;
    },
  },
});
