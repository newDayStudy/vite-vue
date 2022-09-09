<script setup>
import BaseFormVue from "../components/form/BaseForm.vue";
import { reactive, h } from "vue";
import { Select } from "ant-design-vue";
const form = reactive({
  username: "12313",
  password: "3213213",
  sex: "",
});
const formItems = reactive([
  {
    type: "Input",
    col: 8,
    formItemProps: {
      label: "用户名",
      name: "username",
      rules: [{ required: true, message: "不能为空", trigger: "blur" }],
    },
    comProps: {
      placeholder: "请输入",
      allowClear: true,
    },
  },
  {
    type: "Input",
    col: 8,
    formItemProps: {
      label: "密码",
      name: "password",
      rules: [{ required: true, message: "不能为空", trigger: "blur" }],
    },
    comProps: {
      placeholder: "请输入",
      allowClear: true,
    },
  },
  {
    type: "Select",
    col: 8,
    formItemProps: {
      label: "性别",
      name: "sex",
      rules: [{ required: true, message: "不能为空", trigger: "change" }],
    },
    customRender(item) {
      return h(Select, {
        modelValue: form[item.formItemProps.name],
        onChange(e) {
          form[item.formItemProps.name] = e;
        },
        allowClear: true,
        options: [
          { label: "男", value: "1" },
          { label: "女", value: "0" },
        ],
      });
    },
    comProps: {
      placeholder: "请输入",
      allowClear: true,
    },
  },
]);
const getFormValue = () => {
  console.log(form);
};
</script>

<template>
  <div>
    <a-card>
      <BaseFormVue v-model="form" :form-items="formItems" />
      <a-button @click="getFormValue">获取form值</a-button>
    </a-card>
  </div>
</template>
