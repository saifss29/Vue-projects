<template>
  <router-link v-if="link" :to="to" :class="mode">
    <slot></slot>
  </router-link>
  <button v-else :class="mode" :type="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: "button",
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
    mode: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style scoped>
button,
a {
  display: inline-block;
  padding: 0.6rem 1.25rem;
  border: 1px solid #3d008d;
  border-radius: 6px;
  background-color: #3d008d;
  color: white;
  text-decoration: none;
  font: inherit;
  cursor: pointer;
}

button:hover,
a:hover {
  background-color: #27005d;
  border-color: #27005d;
}

.outline {
  background-color: transparent;
  color: #3d008d;
}

.outline:hover {
  background-color: #eddcff;
}
</style>
