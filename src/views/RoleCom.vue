<script setup>
import { onMounted, ref, h, getCurrentInstance } from "vue";
import TableVue from "@/components/table/Table";
import { getRoles, getMenus, setRoles, getUserRole } from "@/apis";
const notification =
  getCurrentInstance().appContext.config.globalProperties.notification;
const roles = ref([]);
const visibleDrawer = ref(false);
const treeData = ref([]);
const checkedKeys = ref([]);
const curRow = ref({});
const columns = ref([
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
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
              curRow.value = { ...record };
              visibleDrawer.value = true;
              getUserRoleApi();
            },
          },
          "菜单授权"
        ),
      ]);
    },
  },
]);
const getUserRoleApi = async () => {
  try {
    const res = await getUserRole({
      roleId: curRow.value.id,
    });
    const permission = res.data.permission;
    checkedKeys.value =
      permission != "" ? permission.split(",").map(Number) : [];
  } catch (error) {
    console.log(error);
  }
};
const getRolesApi = async () => {
  try {
    const res = await getRoles();
    roles.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

const getMenusApi = async () => {
  try {
    const res = await getMenus();
    treeData.value = res.data.records;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getRolesApi();
  getMenusApi();
});

const onSave = async () => {
  try {
    const res = await setRoles({
      permission: checkedKeys.value.join(","),
      roleId: curRow.value.id,
    });
    notification.success({
      description: res.message,
    });
    visibleDrawer.value = false;
  } catch (error) {
    console.log(error);
  }
};
const onClose = () => {
  visibleDrawer.value = false;
};
</script>

<template>
  <a-layout class="a-layout">
    <a-card>
      <TableVue :columns="columns" :data-source="roles" />
    </a-card>
    <a-drawer
      v-if="visibleDrawer"
      :visible="true"
      title="菜单授权"
      @close="onClose"
    >
      <template #extra>
        <a-button type="primary" @click="onSave">保存</a-button>
      </template>
      <a-tree
        v-model:checkedKeys="checkedKeys"
        checkable
        :default-expand-all="true"
        :auto-expand-parent="true"
        :tree-data="treeData"
        :field-names="{
          title: 'name',
          key: 'id',
          children: 'children',
        }"
      >
      </a-tree>
    </a-drawer>
  </a-layout>
</template>

<style lang="scss" scoped>
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
}
</style>
