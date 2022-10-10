<script setup>
import Table from "@/components/table/Table";
import { getMenus, addMenu } from "@/apis";
import { reactive, onMounted, ref, unref, getCurrentInstance, h } from "vue";
import Modal from "@/components/modal";
import BaseFormVue from "@/components/form/BaseForm";
import { Divider } from "ant-design-vue";
import { useModal } from "@/components/modal/hooks/useModal";
const [register, { open, close }] = useModal();
const currentInstance = getCurrentInstance();
const notification =
  currentInstance.appContext.config.globalProperties.notification;
const columns = reactive([
  {
    title: "菜单编号",
    dataIndex: "code",
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
    title: "菜单排序",
    dataIndex: "sort",
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    customRender({ record }) {
      return h("div", [
        h("a", {}, "编辑"),
        record.parent_id == 0 &&
          h(Divider, {
            type: "vertical",
          }),
        record.parent_id == 0 &&
          h("a", {
            innerHTML: "新增",
            onClick() {
              open();
              form.parent_id = record.id;
            },
          }),
      ]);
    },
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
    },
    type: "Input",
  },
  {
    col: 24,
    formItemProps: {
      label: "文件路径",
      name: "filepath",
    },
    type: "Input",
  },
  {
    col: 24,
    formItemProps: {
      label: "菜单图标",
      name: "icon",
    },
    type: "Input",
  },
  {
    col: 24,
    formItemProps: {
      label: "菜单排序",
      name: "sort",
    },
    type: "Input",
  },
]);

onMounted(() => {
  getMenuApi();
});
const form = reactive({
  icon: "",
  code: "",
  name: "",
  path: "",
  filepath: "",
  sort: "",
});
const formRef = ref();
const callback = async () => {
  try {
    const values = await unref(formRef).$refs.ruleForm.validateFields();
    if (form.parent_id) {
      values.parent_id = form.parent_id;
    }
    console.log("values", values);
    addMenuApi(values);
    return true;
  } catch (errorInfo) {
    console.log("Failed:", errorInfo);
  }
};

const addMenuApi = async (params) => {
  try {
    const res = await addMenu(params);
    const { code, message } = res;
    if (code == 200) {
      notification.success({
        description: message,
      });
      form.parent_id = "";
      getMenuApi();
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <a-layout class="a-layout">
    <a-card>
      <a-form>
        <a-form-item>
          <a-button type="primary" @click="open">新增</a-button>
        </a-form-item>
      </a-form>
      <Table row-key="id" :columns="columns" :data-source="dataSource" />
    </a-card>
    <Modal title="新增菜单" :submit="callback" @register="register">
      <BaseFormVue ref="formRef" v-model="form" :form-items="formItems" />
    </Modal>
  </a-layout>
</template>
