<template>
  <teleport to="body">
    <div class="backdrop" @click="$emit('close')"></div>
    <dialog open>
      <header>
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </header>

      <section>
        <slot></slot>
      </section>

      <menu>
        <slot name="actions">
          <button @click="$emit('close')">Close</button>
        </slot>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: ["close"],
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
}

dialog {
  position: fixed;
  top: 20vh;
  left: 50%;
  width: 90%;
  max-width: 30rem;
  transform: translateX(-50%);
  border: none;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}

header {
  padding: 1rem;
  background-color: #3d008d;
  color: white;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  text-align: right;
}
</style>
