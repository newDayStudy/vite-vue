import { Input, Select, InputPassword } from "ant-design-vue";
import { shallowReactive } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
const map = new Map();
map.set("Input", Input);
map.set("Select", Select);
map.set("QuillEditor", QuillEditor);
map.set("InputPassword", InputPassword);
export default map;
