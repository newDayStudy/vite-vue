import { createApp } from "vue";
import App from "./App.vue";
import routes from "./router/index";
import registerComponent from "./config";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const app = createApp(App);
registerComponent(app);
app.use(routes).mount("#app");
