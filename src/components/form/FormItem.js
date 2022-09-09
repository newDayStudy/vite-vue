import { Input, Select, InputPassword } from "ant-design-vue";
import { shallowRef } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
const map = new Map();
map.set("Input", shallowRef(Input));
map.set("Select", shallowRef(Select));
map.set("QuillEditor", shallowRef(QuillEditor));
map.set("InputPassword", InputPassword);
export default map;
