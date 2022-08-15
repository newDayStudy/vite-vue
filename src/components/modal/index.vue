<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";

const $props = defineProps({
  submit: {
    type: Function,
    default: () => {},
  },
});

const visible = ref(false);

const confirmLoading = ref(false);

const emits = defineEmits(["register"]);

onMounted(() => {
  const instance = getCurrentInstance();
  emits("register", instance);
});

const open = (_) => {
  visible.value = true;
};
const close = (_) => {
  visible.value = false;
};

const onsubmit = async (_) => {
  confirmLoading.value = true;
  try {
    const res = await $props.submit();
    res && close();
  } catch (error) {
    console.log("点击确定报错", error);
  } finally {
    confirmLoading.value = false;
  }
};

defineExpose({
  open,
  close,
  onsubmit,
});
</script>

<template>
  <a-modal
    v-if="visible"
    :visible="visible"
    v-bind="$attrs"
    :confirm-loading="confirmLoading"
    @cancel="close"
    @ok="onsubmit"
  >
    <slot></slot>
  </a-modal>
</template>
