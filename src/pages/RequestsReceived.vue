<template>
  <section>
    <h1>Requests Received</h1>

    <button @click="loadRequests">Refresh</button>

    <p v-if="error">{{ error }}</p>
    <p v-if="isLoading">Loading requests...</p>

    <ul v-else-if="hasRequests">
      <li v-for="request in requests" :key="request.id">
        <h3>{{ request.userEmail }}</h3>
        <p>{{ request.message }}</p>
        <small>Coach ID: {{ request.coachId }}</small>
      </li>
    </ul>

    <p v-else>No requests found.</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    requests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      this.error = null;

      try {
        await this.$store.dispatch("requests/loadRequests");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
section {
  max-width: 42rem;
  margin: 2rem auto;
  padding: 0 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: #3d008d;
  color: white;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
