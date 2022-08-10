import { Input, Select } from "ant-design-vue";
import { shallowRef } from "vue";
const map = new Map();
map.set("Input", shallowRef(Input));
map.set("Select", shallowRef(Select));

export default map;
