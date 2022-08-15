<script setup>
import { computed, reactive, toRaw, unref } from "vue";
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
  customCol: {
    type: Object,
    default: () => {},
  },
  pagination: {
    type: [Object, Boolean],
    default: () => {},
  },
  rowKey: {
    type: [Function, String],
    default: "key",
  },
  selectedType: {
    type: [String, Boolean],
    default: false,
  },
  selections: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(["change"]);
const state = reactive({
  basePagition: {
    current: 1,
    pageSize: 5,
    size: "small",
    total: 0,
    showTotal(total, range) {
      return `共${total}条, 当前${range[0]} - ${range[1]}条`;
    },
    showSizeChanger: true,
  },
});

const mergePagination = computed(() => {
  console.log("重新计算页码");
  return typeof props.pagination === "boolean"
    ? false
    : {
        ...toRaw(state.basePagition),
        ...toRaw(props.pagination),
      };
});

const onChange = (pagination) => {
  state.basePagition = {
    ...toRaw(state.basePagition),
    ...pagination,
  };
  emits("change", toRaw(state.basePagition));
};

const onRowSelection = (selectedRowKeys) => {
  baseRowSelection.selectedRowKeys = selectedRowKeys;
};

const baseRowSelection = reactive({
  selectedRowKeys: [],
  type: props.selectedType,
  onChange: onRowSelection,
  ...props.customCol,
  selections: toRaw(props.selections),
});

const rowSelection = computed(() => {
  if (typeof props.selectedType === "boolean") {
    return false;
  }
  return baseRowSelection;
});

const customRow = (record, index) => {
  return {
    onClick(e) {
      e.stopPropagation();
      console.log(record, index);
    },
  };
};

defineExpose({
  selectedRowKeys: toRaw(baseRowSelection),
});
</script>

<template>
  <a-table
    class="a-table"
    :row-key="rowKey"
    :columns="columns"
    :data-source="dataSource"
    :pagination="mergePagination"
    :row-selection="rowSelection"
    :custom-row="customRow"
    size="middle"
    :scroll="{ x: 'max-content' }"
    @change="onChange"
  >
  </a-table>
</template>

<style lang="scss" scoped>
.a-table {
  margin-top: 10px;
}
</style>
