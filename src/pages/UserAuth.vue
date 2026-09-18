<template>
  <base-card>
    <h1>{{ submitButtonCaption }}</h1>

    <base-dialog
      v-if="error"
      title="Authentication failed"
      @close="error = null"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <base-spinner v-if="isLoading" />

    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>

      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>

      <p v-if="!formIsValid">
        Please enter a valid email and password with at least 6 characters.
      </p>

      <base-button type="submit">{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="outline" @click="switchAuthMode">
        {{ switchModeButtonCaption }}
      </base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      }

      return "Signup";
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      }

      return "Login instead";
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;

      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;
      this.error = null;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("auth/login", actionPayload);
        } else {
          await this.$store.dispatch("auth/signup", actionPayload);
        }

        this.$router.replace("/coaches");
      } catch (error) {
        this.error = error.message || "Failed to authenticate.";
      }

      this.isLoading = false;
    },

    switchAuthMode() {
      this.error = null;
      this.formIsValid = true;

      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>

<style scoped>
div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.5rem;
  font: inherit;
  border: 1px solid #ccc;
  border-radius: 6px;
}

</style>
