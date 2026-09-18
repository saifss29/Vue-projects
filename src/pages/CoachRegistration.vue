<template>
  <base-card>
    <h1>Register as a Coach</h1>

    <base-spinner v-if="isLoading" />

    <coach-form v-else @save-data="saveData"></coach-form>
  </base-card>

  <base-dialog
    v-if="error"
    title="Could not register coach"
    @close="error = null"
  >
    <p>{{ error }}</p>
  </base-dialog>
</template>

<script>
import CoachForm from "../components/CoachForm.vue";

export default {
  components: {
    CoachForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async saveData(formData) {
      this.isLoading = true;
      this.error = null;

      try {
        await this.$store.dispatch("coaches/registerCoach", formData);
        this.$router.push("/coaches");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 1.5rem;
}

p {
  font-weight: 600;
  color: #b00020;
}
</style>
