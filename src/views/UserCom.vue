<script setup>
import Table from "@/components/table/Table";
import { getUsers, getRoles, addUser } from "@/apis";
import { reactive, onMounted, ref, unref, getCurrentInstance, h } from "vue";
import Modal from "@/components/modal";
import Form from "@/components/form/Form";
import { useModal } from "@/components/modal/hooks/useModal";
const [register, { open, close }] = useModal();
const currentInstance = getCurrentInstance();
const columns = reactive([
  {
    title: "用户名称",
    dataIndex: "username",
  },
  {
    title: "角色名称",
    dataIndex: "roleName",
  },
  {
    title: "联系方式",
    dataIndex: "telephone",
  },
  {
    title: "操作",
    dataIndex: "action",
    customRender({ text, record }) {
      return h("div", [
        h(
          "a",
          {
            onClick() {
              console.log(record);
            },
          },
          "菜单授权"
        ),
      ]);
    },
  },
]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});
const dataSource = ref([]);
const getUsersApi = async () => {
  try {
    const res = await getUsers({
      pageSize: pagination.pageSize,
      current: pagination.current,
    });
    const { code, data, message } = res;
    if (code == 200) {
      dataSource.value = data.records;
      pagination.total = data.total;
    }
  } catch (error) {
    console.log("error", error);
  }
};
const itemList = reactive([
  {
    key: "username",
    formItemProps: {
      label: "用户名",
      rules: [{ required: true, message: "请输入用户名" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入用户名",
      allowClear: true,
    },
  },
  {
    key: "password",
    formItemProps: {
      label: "密码",
      rules: [{ required: true, message: "请输入密码" }],
    },
    type: "InputPassword",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入密码",
      allowClear: true,
    },
  },
  {
    key: "roleId",
    formItemProps: {
      label: "角色名称",
      rules: [{ required: true, message: "请选择角色名称" }],
    },
    type: "Select",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请选择角色名称",
      allowClear: true,
    },
  },
  {
    key: "telephone",
    formItemProps: {
      label: "联系方式",
      rules: [{ required: true, message: "请输入联系方式" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入联系方式",
      allowClear: true,
      maxLength: 11,
    },
  },
]);
const visible = ref(false);
const roles = ref([]);
const getRolesApi = async () => {
  try {
    const res = await getRoles();
    const { code, data, message } = res;
    if (code == 200) {
      roles.value = data;
      itemList[2].slotProps.options = data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      visible.value = true;
    }
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  getUsersApi();
  getRolesApi();
});
const formRef = ref();
const submit = async () => {
  try {
    const values = await unref(formRef).formRef.validateFields();
    const roleName = roles.value.find((item) => item.id == values.roleId)?.name;
    console.log(values, roleName);
    addUserApi({ ...values, roleName });
  } catch (error) {
    console.log(error);
  }
};
const addUserApi = async (params) => {
  try {
    const res = await addUser(params);
    const { code, message } = res;
    if (code == 200) {
      currentInstance.appContext.config.globalProperties.notification.success({
        description: message,
      });
      close();
      getUsersApi();
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="a-layout">
    <a-card>
      <a-form-model>
        <a-form-model-item>
          <a-button type="primary" @click="open">新增</a-button>
        </a-form-model-item>
      </a-form-model>
      <Table :columns="columns" :data-source="dataSource" />
    </a-card>
    <Modal title="新增用户" :submit="submit" @register="register">
      <Form
        v-if="visible"
        ref="formRef"
        :item-list="itemList"
        :form-props="{ layout: 'vertical' }"
        :footer="null"
      />
    </Modal>
  </div>
</template>
<style lang="scss" scoped>
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
}
</style>
