<script setup>
import { computed, effect, reactive, ref, toRaw } from "vue";
import components from "./FormItem";
const props = defineProps({
  itemList: {
    type: Array,
    required: true,
    default: () => [],
  },
  formProps: {
    type: Object,
    default: () => {
      return {
        layout: "inline",
      };
    },
  },
  footer: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(["submit"]);
const ruleForm = reactive({});
const formRef = ref();
const formItems = computed(() => {
  console.log("props.itemList", props.itemList);
  const itemList = toRaw(props.itemList);
  const list = JSON.parse(JSON.stringify(itemList));
  return reactive(list).map((item) => {
    item.type = components.get(item.type);
    return item;
  });
});

effect(() => {
  props.itemList.forEach((item) => {
    ruleForm[item.key] = item.defaultValue || "";
  });
});

const onsubmit = async () => {
  try {
    const values = await formRef.value.validateFields();
    emits("submit", values);
  } catch (errorInfo) {
    console.log("Failed:", errorInfo);
  }
};
const onreset = () => {
  props.itemList.forEach((item) => {
    ruleForm[item.key] = "";
  });
  formRef.value.clearValidate();
};

defineExpose({
  formRef,
  ruleForm,
  onsubmit,
});
</script>

<template>
  <a-form
    ref="formRef"
    autocomplete="off"
    name="aForm"
    :model="ruleForm"
    v-bind="formProps"
  >
    <a-form-item
      v-for="item in formItems"
      :key="item.key"
      :name="item.key"
      v-bind="item.formItemProps"
    >
      <component
        :is="item.type"
        v-bind="item.slotProps"
        v-model:[item.slotProps.model]="ruleForm[item.key]"
      ></component>
    </a-form-item>
    <slot name="footer">
      <a-form-item v-if="footer">
        <a-button type="primary" @click="onsubmit">查询</a-button>
        <a-button style="margin-left: 10px" @click="onreset">重置</a-button>
      </a-form-item>
    </slot>
  </a-form>
</template>
