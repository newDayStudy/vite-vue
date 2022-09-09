<script setup>
import { reactive } from "vue";
import BaseFormVue from "../components/form/BaseForm.vue";
const state = reactive({
  formItems: [
    {
      type: "Input",
      formItemProps: {
        label: "用户名",
        name: "username",
      },
      comProps: {
        placeholder: "请输入",
      },
    },
    {
      type: "InputPassword",
      formItemProps: {
        label: "密码",
        name: "password",
      },
      comProps: {
        placeholder: "请输入",
      },
    },
  ],
});
const form = reactive({
  username: "2131321",
  password: "1231321312",
});
const getForm = () => {
  console.log(form);
};
</script>
<template>
  <div>
    <a-card>
      <BaseFormVue v-model="form" :form-items="state.formItems" />
    </a-card>
    <a-button @click="getForm">获取form值</a-button>

    <a-input v-model.value="form.username" />
  </div>
</template>
