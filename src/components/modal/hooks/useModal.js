import { watchEffect } from "vue";
export function useModal() {
  let _vue = null;

  function register(instance) {
    _vue = instance;
  }

  const methods = {
    open(data) {
      if (typeof data == "function") {
        _vue.callback = data;
      }
      _vue.exposed.open();
    },
  };

  return [register, methods];
}
