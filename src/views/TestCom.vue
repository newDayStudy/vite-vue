<script setup lang="jsx">
import BaseFormVue from "../components/form/BaseForm.vue";
import { reactive, h, ref, onMounted } from "vue";
import { Select, TreeSelect } from "ant-design-vue";
import BaseFormJsx from "@/components/form/BaseFormVue.jsx";
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
        disabled: true,
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];
const form = reactive({
  username: "12313",
  password: "3213213",
  sex: "1",
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
    col: 8,
    formItemProps: {
      label: "性别",
      name: "sex",
      rules: [{ required: true, message: "不能为空", trigger: "change" }],
    },
    customRender(item) {
      return h(Select, {
        value: form[item.formItemProps.name],
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
const formItems1 = reactive([
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
    col: 8,
    formItemProps: {
      label: "性别",
      name: "sex",
      rules: [{ required: true, message: "不能为空", trigger: "change" }],
    },
    customRender(item) {
      return (
        <a-select
          v-model:value={form[item.formItemProps.name]}
          allowClear={true}
          style="width: 200px;"
        >
          <a-select-option value="1">男</a-select-option>
          <a-select-option value="0">女</a-select-option>
        </a-select>
      );
    },
  },
]);

const treeData1 = reactive(treeData);
const treeForm = reactive({
  value: [],
});
const submit = () => {
  console.log(treeForm);
};
const canvas = ref(null);
console.log(canvas);
const draw = () => {
  const ctx = canvas.value.getContext("2d");
  ctx.lineTo(10, 20);
  ctx.lineTo(20, 40);
  ctx.lineTo(40, 80);
  ctx.stroke();
};
onMounted(() => {
  console.log(canvas.value);
});
</script>

<template>
  <div>
    <a-card>
      <BaseFormVue v-model="form" :form-items="formItems" />
      <p>
        <a-button @click="getFormValue">获取form值</a-button>
      </p>
    </a-card>
    <a-card>
      <BaseFormJsx v-model="form" :form-items="formItems1" />
    </a-card>
    <a-card>
      <a-form :model="treeForm">
        <a-form-item
          label="树"
          name="value"
          :rules="[
            {
              required: true,
              message: 'Please input your username!',
              trigger: 'blur',
            },
          ]"
        >
          <a-tree-select
            v-model:value="treeForm.value"
            style="width: 100%"
            :tree-data="treeData1"
            tree-checkable
            :show-checked-strategy="SHOW_PARENT"
            placeholder="Please select"
          />
        </a-form-item>
        <a-form-item>
          <a-button @click="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card>
      <canvas id="canvas" ref="canvas"></canvas>
    </a-card>
  </div>
</template>
