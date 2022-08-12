<script setup>
import { reactive, ref, unref, h } from "vue";
import Table from "@/components/table/Table.vue";
import Form from "@/components/form/Form.vue";
import Calendar from "@/components/calender";
import { Button } from "ant-design-vue";
const tableRef = ref();
const state = reactive({
  dataSource: [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖2",
      age: 42,
      address: "西湖区湖底公园1号",
    },
    {
      key: "3",
      name: "胡彦祖3",
      age: 42,
      address: "西湖区湖底公园1号",
    },
    {
      key: "4",
      name: "胡彦祖4",
      age: 42,
      address: "西湖区湖底公园1号",
    },
    {
      key: "5",
      name: "胡彦祖5",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ],
  columns: [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "操作",
      dataIndex: "action",
      customRender({ text, record, index, column }) {
        return h(
          Button,
          {
            size: "small",
            type: "primary",
            onClick(e) {
              e.stopPropagation();
              alert("删除行的下标" + index);
              state.dataSource = state.dataSource.filter(
                (item, i) => i != index
              );
            },
          },
          () => h("span", "删除")
        );
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

const submit = (values) => {
  console.log("表单数据", values);
};

const change = (pagination) => {
  console.log("页码：", pagination.current);
};
const deleteRow = () => {
  const { selectedRowKeys } = unref(tableRef).selectedRowKeys;
  state.dataSource = state.dataSource.filter(
    (item) => !selectedRowKeys.includes(item.key)
  );
};
const selections = reactive([
  {
    text: "删除",
    key: "delete",
    onSelect: deleteRow,
  },
]);

const onCalendar = (dayObj) => {
  console.log(dayObj);
};
</script>

<template>
  <a-layout class="a-layout">
    <Form :item-list="state.formItems" @submit="submit" />
    <Table
      ref="tableRef"
      row-key="key"
      :data-source="state.dataSource"
      :columns="state.columns"
      selected-type="checkbox"
      :selections="selections"
      @change="change"
    >
    </Table>
    <a-card>
      <Calendar @click="onCalendar" />
    </a-card>
  </a-layout>
</template>

<style lang="scss" scoped>
.a-layout {
  box-sizing: border-box;
  height: 100%;
  padding: 30px;
}
</style>
