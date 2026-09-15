<template>
  <span :class="type">{{ title }}</span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
span {
  display: inline-block;
  margin: 0.25rem 0.5rem 0.25rem 0;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  color: white;
  font-size: 0.85rem;
}

.frontend {
  background-color: #3d008d;
}

.backend {
  background-color: #007a5a;
}

.career {
  background-color: #a63f00;
}
</style>
