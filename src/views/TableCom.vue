<script setup>
import { reactive, h, ref, unref, onMounted } from "vue";
import apis from "@/apis";
import Table from "@/components/table/Table.vue";
import Modal from "@/components/modal";

import { Button } from "ant-design-vue";

import { useModal } from "@/components/modal/hooks/useModal";

const [register, { open }] = useModal();
const formRef = ref();

const tableRef = ref();

const state = reactive({
  dataSource: [],
  columns: [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "子标题",
      dataIndex: "sub_title",
      key: "sub_title",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "发布人",
      dataIndex: "publisher_name",
      key: "publisher_name",
    },
    {
      title: "操作",
      dataIndex: "action",
      fixed: "right",
      align: "center",
      customRender({ text, record, index, column }) {
        return h("div", [
          h(
            Button,
            {
              size: "small",
              type: "primary",
              style: {
                "margin-right": "10px",
              },
              onClick(e) {
                e.stopPropagation();
                open(record);
              },
            },
            () => h("span", "编辑")
          ),
          h(
            Button,
            {
              size: "small",
              type: "danger",
              onClick(e) {
                e.stopPropagation();
                deleteRow(record.id);
              },
            },
            () => h("span", "删除")
          ),
        ]);
      },
    },
  ],
  formItems: [
    {
      key: "username",
      formItemProps: {
        label: "姓名",
        rules: [{ required: true, message: "请输入姓名" }],
      },
      defaultValue: "",
      type: "Input",
      slotProps: {
        placeholder: "请输入",
        allowClear: true,
      },
    },
    {
      key: "age",
      formItemProps: {
        label: "年龄",
        rules: [{ required: true, message: "请输入年龄" }],
      },
      defaultValue: "",
      type: "Input",
      slotProps: {
        placeholder: "请输入",
        allowClear: true,
      },
    },
    {
      key: "sex",
      formItemProps: {
        label: "性别",
        rules: [{ required: true, message: "请选择性别" }],
      },
      defaultValue: "",
      type: "Select",
      slotProps: {
        placeholder: "请选择",
        allowClear: true,
        style: {
          width: "200px",
        },
        options: [
          {
            label: "男",
            value: "0",
          },
          {
            label: "女",
            value: "1",
          },
        ],
      },
    },
  ],
});

const pagination = reactive({
  current: 1,
  pageSize: 5,
  total: 0,
});

const submit = (values) => {
  console.log("表单数据", values);
};

const change = (page) => {
  console.log("页码：", page.current);
  pagination.current = page.current;
  pagination.pageSize = page.pageSize;
};
const deleteRow = async (id) => {
  const res = await apis.deleteRowData({
    id,
  });
  const { code, message } = res;
  if (code == 200) {
    alert(message);
    getTableData();
  } else {
    alert(message);
  }
};
const deleteRows = () => {
  const { selectedRowKeys } = unref(tableRef).selectedRowKeys;
  state.dataSource = state.dataSource.filter(
    (item) => !selectedRowKeys.includes(item.key)
  );
};
const selections = reactive([
  {
    text: "删除",
    key: "delete",
    onSelect: deleteRows,
  },
]);

const callback = async () => {
  try {
    const values = await unref(formRef).formRef.validateFields();
    console.log(values);
    return true;
  } catch (errorInfo) {
    console.log("Failed:", errorInfo);
  }
};

const getTableData = async (current = 1, pageSize = 10) => {
  const res = await apis.getTableData({
    current,
    pageSize,
  });
  const { records, total } = res.data;
  state.dataSource = records;
  pagination.total = total;
};
onMounted(getTableData);
</script>

<template>
  <a-layout class="a-layout">
    <a-card>
      <Table
        ref="tableRef"
        row-key="key"
        :data-source="state.dataSource"
        :columns="state.columns"
        selected-type="checkbox"
        :selections="selections"
        :pagination="pagination"
        :custom-col="{ fixed: true, columnWidth: 80 }"
        @change="change"
      >
      </Table>
    </a-card>
    <Modal title="模态框" width="50%" :submit="callback" @register="register">
    </Modal>
  </a-layout>
</template>

<style lang="scss" scoped>
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 30px;
}
</style>
