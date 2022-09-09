<script setup>
import Table from "@/components/table/Table";
import { getMenus, addMenu } from "@/apis";
import { reactive, onMounted, ref, unref, getCurrentInstance, h } from "vue";
import Modal from "@/components/modal";
import BaseFormVue from "@/components/form/BaseForm";
import { useModal } from "@/components/modal/hooks/useModal";
const [register, { open, close }] = useModal();
const currentInstance = getCurrentInstance();
const columns = reactive([
  {
    title: "菜单编号",
    dataIndex: "id",
  },
  {
    title: "菜单名称",
    dataIndex: "name",
  },
  {
    title: "菜单图标",
    dataIndex: "icon",
  },
  {
    title: "菜单路径",
    dataIndex: "path",
  },
  {
    title: "操作",
    dataIndex: "action",
  },
]);

const dataSource = ref([]);
const getMenuApi = async () => {
  try {
    const res = await getMenus();
    const { code, data, message } = res;
    if (code == 200) {
      dataSource.value = data.records;
    }
  } catch (error) {
    console.log("error", error);
  }
};
const formItems = reactive([
  {
    col: 24,
    formItemProps: {
      label: "菜单名称",
      name: "name",
      rules: [{ required: true, message: "请输入菜单名称" }],
    },
    type: "Input",
  },
  {
    col: 24,
    formItemProps: {
      label: "菜单编码",
      name: "code",
      rules: [{ required: true, message: "请输入菜单编码" }],
    },
    type: "Input",
  },
  {
    col: 24,
    formItemProps: {
      name: "path",
      label: "菜单路由",
      rules: [{ required: true, message: "请输入菜单路由" }],
    },
    type: "Input",
  },
  {
    col: 24,
    formItemProps: {
      label: "文件路径",
      name: "filepath",
      rules: [{ required: true, message: "请输入文件路径" }],
    },
    type: "Input",
  },
  {
    col: 24,
    formItemProps: {
      label: "菜单图标",
      name: "icon",
      rules: [{ required: true, message: "请输入菜单图标" }],
    },
    type: "Input",
  },
]);

onMounted(() => {
  getMenuApi();
});
const formRef = ref();
const submit = async () => {
  try {
    formRef.value.$refs.ruleForm.validate((valid) => {
      if (valid) {
        console.log(1111);
      }
    });
    // addMenuApi({ ...values, roleName });
  } catch (error) {
    console.log(error);
  }
};
const addMenuApi = async (params) => {
  try {
    const res = await addMenu(params);
    const { code, message } = res;
    if (code == 200) {
      currentInstance.appContext.config.globalProperties.notification.success({
        description: message,
      });
      close();
      getMenuApi();
    }
  } catch (error) {
    console.log(error);
  }
};
const form = reactive({
  icon: "",
  code: "",
  name: "",
  path: "",
  filepath: "",
});
</script>
<template>
  <div>
    <a-card>
      <a-form-model>
        <a-form-model-item>
          <a-button type="primary" @click="open">新增</a-button>
        </a-form-model-item>
      </a-form-model>
      <Table :columns="columns" :data-source="dataSource" />
    </a-card>
    <Modal title="新增菜单" :submit="submit" @register="register">
      <BaseFormVue ref="formRef" v-model="form" :form-items="formItems" />
    </Modal>
  </div>
</template>
