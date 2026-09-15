<template>
  <div>
    <h3>Filter</h3>

    <input
      id="frontend"
      type="checkbox"
      v-model="filters.frontend"
      @change="updateFilters"
    />
    <label for="frontend">Frontend</label>

    <input
      id="backend"
      type="checkbox"
      v-model="filters.backend"
      @change="updateFilters"
    />
    <label for="backend">Backend</label>

    <input
      id="career"
      type="checkbox"
      v-model="filters.career"
      @change="updateFilters"
    />
    <label for="career">Career</label>
  </div>
</template>

<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    updateFilters() {
      this.$emit("change-filter", this.filters);
    },
  },
};
</script>

<style scoped>
div {
  margin-bottom: 1.5rem;
}

input {
  margin-left: 0.75rem;
}

input:first-of-type {
  margin-left: 0;
}

label {
  margin-left: 0.25rem;
  margin-right: 0.75rem;
}

p {
  margin: 0.25rem 0;
}
</style>
