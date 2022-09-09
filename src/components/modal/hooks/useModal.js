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
      if (Object.prototype.toString.call(data) == "object Object") {
        console.log("data", data);
      }
      _vue.exposed.open();
    },
    close() {
      _vue.exposed.close();
      _vue = null;
    },
  };

  return [register, methods];
}
