<template>
  <section>
    <h2>Contact Coach</h2>
    <p>You are contacting: {{ coachId }}</p>

    <p v-if="error">{{ error }}</p>
    <p v-if="isLoading">Sending request...</p>

    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Your Email</label>
        <input id="email" type="email" v-model="email" />
      </div>

      <div>
        <label for="message">Message</label>
        <textarea id="message" rows="5" v-model="message"></textarea>
      </div>

      <button>Send Message</button>

      <p v-if="!formIsValid">Please enter a valid email and message.</p>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    coachId() {
      return this.$route.params.id;
    },
  },
  methods: {
    async submitForm() {
      if (this.email === "" || this.message === "") {
        this.formIsValid = false;
        return;
      }

      this.formIsValid = true;
      this.isLoading = true;
      this.error = null;

      try {
        await this.$store.dispatch("requests/contactCoach", {
          email: this.email,
          message: this.message,
          coachId: this.coachId,
        });

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
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

form {
  margin-top: 1rem;
}

div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  max-width: 28rem;
  padding: 0.5rem;
  font: inherit;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 6px;
  background-color: #3d008d;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #27005d;
}

p {
  margin: 0.5rem 0;
}
</style>
