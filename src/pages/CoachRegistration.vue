<template>
  <section>
    <h1>Register as a Coach</h1>

    <p v-if="error">{{ error }}</p>
    <p v-if="isLoading">Saving coach...</p>

    <coach-form @save-data="saveData"></coach-form>
  </section>
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
section {
  max-width: 42rem;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  margin-bottom: 1.5rem;
}

p {
  font-weight: 600;
  color: #b00020;
}
</style>
