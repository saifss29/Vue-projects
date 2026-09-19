<template>
  <base-card>
    <h1>Requests Received</h1>

    <base-button mode="outline" @click="loadRequests">Refresh</base-button>

    <base-dialog
      v-if="error"
      title="Could not load requests"
      @close="error = null"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <base-spinner v-if="isLoading" />

    <ul v-else-if="hasRequests">
      <li v-for="request in requests" :key="request.id">
        <h3>{{ request.userEmail }}</h3>
        <p>{{ request.message }}</p>
        <small>Coach ID: {{ request.coachId }}</small>
      </li>
    </ul>

    <p v-else>No requests found.</p>
  </base-card>
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
