<script setup>
import { reactive, h, ref, unref, onMounted, computed } from "vue";
import apis, { updateArticle, exportExcel } from "@/apis";
import Table from "@/components/table/Table.vue";
import Modal from "@/components/modal";
import Form from "@/components/form/Form";
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
                open();
                state.record = { ...record };
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
      key: "title",
      formItemProps: {
        label: "标题",
        rules: [{ required: true, message: "请输入标题" }],
      },
      defaultValue: "",
      type: "Input",
      slotProps: {
        model: "value",
        placeholder: "请输入",
        allowClear: true,
      },
    },
    {
      key: "sub_title",
      formItemProps: {
        label: "子标题",
        rules: [{ required: true, message: "请输入子标题" }],
      },
      defaultValue: "",
      type: "Input",
      slotProps: {
        model: "value",
        placeholder: "请输入",
        allowClear: true,
      },
    },
    {
      key: "content",
      formItemProps: {
        label: "内容",
      },
      defaultValue: "",
      type: "QuillEditor",
      slotProps: {
        content: "",
        model: "content",
        contentType: "html",
        options: {
          placeholder: "请输入",
        },
      },
    },
  ],
  record: {},
});
const formItems = computed(() => {
  return state.formItems.map((item) => {
    const slotProps = item.slotProps || {};
    if (item.type == "QuillEditor") {
      slotProps.content = state.record[item.key];
    }
    return {
      ...item,
      defaultValue: state.record[item.key],
      slotProps,
    };
  });
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
  getTableData();
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
const deleteRows = async () => {
  const { selectedRowKeys } = unref(tableRef).selectedRowKeys;
  await deleteRow(selectedRowKeys.join(","));
  if (selectedRowKeys.length == state.dataSource.length) {
    pagination.current = pagination.current - 1 || 1;
    getTableData();
  }
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
    updateRow(values);
    return true;
  } catch (errorInfo) {
    console.log("Failed:", errorInfo);
  }
};

const updateRow = async (values) => {
  const id = state.record.id;
  const res = await updateArticle({
    ...values,
    id,
  });
  if (res.code == 200) {
    alert(res.message);
    getTableData();
    state.record = {};
  } else {
    alert(res.message);
  }
};
const getTableData = async () => {
  const res = await apis.getTableData({
    current: pagination.current,
    pageSize: pagination.pageSize,
  });
  const { records, total } = res.data;
  state.dataSource = records;
  pagination.total = total;
};
onMounted(getTableData);

const exportExcelEvent = async () => {
  const res = await exportExcel({
    type: "excel",
  });
  const blob = new Blob([res]);
  const a = document.createElement("a");
  a.download = new Date().getTime() + ".xlsx";
  a.href = URL.createObjectURL(blob);
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a);
};
</script>

<template>
  <a-layout class="a-layout">
    <a-card>
      <a-button type="primary" @click="exportExcelEvent">导出</a-button>
      <Table
        ref="tableRef"
        row-key="id"
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
      <Form
        ref="formRef"
        :item-list="formItems"
        :form-props="{ layout: 'vertical' }"
        :footer="false"
      />
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
