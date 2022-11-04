<template>
  <div>123132-{{ name }}</div>
</template>
<script>
export default {
  props: {
    name: {
      type: [Boolean, String],
      default: true,
    },
  },
  created() {
    console.log(this.$attrs);
  },
};
</script>
