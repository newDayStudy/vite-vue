import { createApp } from "vue";
import App from "./App.vue";
import routes from "./router/index";
import registerComponent from "./config";
const app = createApp(App);
registerComponent(app);
app.use(routes).mount("#app");
