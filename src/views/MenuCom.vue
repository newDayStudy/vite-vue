<script setup>
import Table from "@/components/table/Table";
import { getMenus, addMenu } from "@/apis";
import { reactive, onMounted, ref, unref, getCurrentInstance, h } from "vue";
import Modal from "@/components/modal";
import Form from "@/components/form/Form";
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
const itemList = reactive([
  {
    key: "name",
    formItemProps: {
      label: "菜单名称",
      rules: [{ required: true, message: "请输入菜单名称" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入菜单名称",
      allowClear: true,
    },
  },
  {
    key: "code",
    formItemProps: {
      label: "菜单编码",
      rules: [{ required: true, message: "请输入菜单编码" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入菜单编码",
      allowClear: true,
    },
  },
  {
    key: "path",
    formItemProps: {
      label: "菜单路由",
      rules: [{ required: true, message: "请输入菜单路由" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入菜单路由",
      allowClear: true,
    },
  },
  {
    key: "filepath",
    formItemProps: {
      label: "文件路径",
      rules: [{ required: true, message: "请输入文件路径" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入文件路径",
      allowClear: true,
    },
  },
  {
    key: "icon",
    formItemProps: {
      label: "菜单图标",
      rules: [{ required: true, message: "请输入菜单图标" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入菜单图标",
      allowClear: true,
    },
  },
]);

onMounted(() => {
  getMenuApi();
});
const visible = ref(false);
const formRef = ref();
const submit = async () => {
  try {
    const values = await unref(formRef).formRef.validateFields();
    const roleName = roles.value.find((item) => item.id == values.roleId)?.name;
    console.log(values, roleName);
    addMenuApi({ ...values, roleName });
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
      <Form
        v-if="visible"
        :item-list="itemList"
        :form-props="{ layout: 'vertical' }"
        :footer="null"
      />
    </Modal>
  </div>
</template>
