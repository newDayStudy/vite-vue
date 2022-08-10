<script setup>
import { ref, unref, computed, reactive } from "vue";
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  dataSource: {
    type: Array,
    default: () => [],
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
const basePagition = ref({
  current: 1,
  pageSize: 5,
  size: "small",
  total: 0,
  showTotal(total, range) {
    return `共${total}条, 当前${range[0]} - ${range[1]}条`;
  },
  showSizeChanger: true,
});

const mergePagination = computed(() => {
  return typeof props.pagination === "boolean"
    ? false
    : {
        ...unref(basePagition),
        ...unref(props.pagination),
      };
});

const onChange = (pagination) => {
  basePagition.value = {
    ...unref(basePagition.value),
    ...unref(pagination),
  };
  emits("change", unref(mergePagination));
};

const onRowSelection = (selectedRowKeys) => {
  baseRowSelection.selectedRowKeys = selectedRowKeys;
};

const baseRowSelection = reactive({
  selectedRowKeys: [],
  type: props.selectedType,
  onChange: onRowSelection,
  selections: unref(props.selections),
});

const rowSelection = computed(() => {
  if (typeof props.selectedType === "boolean") {
    return false;
  }
  return unref(baseRowSelection);
});

defineExpose({
  selectedRowKeys: unref(baseRowSelection),
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
    @change="onChange"
  >
  </a-table>
</template>

<style lang="scss" scoped>
.a-table {
  margin-top: 10px;
}
</style>
