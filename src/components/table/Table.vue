<script setup>
import { ref, unref, computed } from "vue";
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
});
const basePagition = ref({
  current: 1,
  pageSize: 10,
  showTotal(total, range) {
    return `共${total}条, 当前${range[0]} - ${range[1]}条`;
  },
  showSizeChanger: true,
  size: "small",
  total: 0,
});

const mergePagination = computed(() => {
  return typeof props.pagination === "boolean"
    ? false
    : {
        ...unref(basePagition),
        ...unref(props.pagination),
      };
});
console.log(props);

console.log(mergePagination);
</script>

<template>
  <slot></slot>
  <a-table
    class="a-table"
    row-key="key"
    :columns="columns"
    :data-source="dataSource"
    :pagination="mergePagination"
  >
  </a-table>
</template>

<style lang="scss" scoped>
.a-table {
  margin-top: 10px;
}
</style>
