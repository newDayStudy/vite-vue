<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "@/store";
import { login } from "@/apis";
const formState = reactive({
  username: "admin",
  password: "123456",
  remember: true,
});
const useUserStore = userStore();
const router = useRouter();
const onFinish = async (values) => {
  console.log("Success:", values);
  try {
    const res = await login({
      ...values,
    });
    useUserStore.bindUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    router.push("/home");
  } catch (error) {
    console.log(error);
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>
<template>
  <a-layout class="a-layout">
    <a-layout-content class="a-layout-content">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.remember"
            >Remember me</a-checkbox
          >
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-layout-content>
  </a-layout>
</template>

<style lang="scss" scoped>
.a-layout {
  height: 100%;
  &-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
