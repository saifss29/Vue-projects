<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="first-name">First Name</label>
      <input id="first-name" type="text" v-model="firstName" />
    </div>

    <div>
      <label for="last-name">Last Name</label>
      <input id="last-name" type="text" v-model="lastName" />
    </div>

    <div>
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model="description"></textarea>
    </div>

    <div>
      <label for="rate">Hourly Rate</label>
      <input id="rate" type="number" min="0" v-model.number="rate" />
    </div>

    <div>
      <h3>Areas</h3>

      <input id="frontend" type="checkbox" value="frontend" v-model="areas" />
      <label for="frontend">Frontend</label>

      <input id="backend" type="checkbox" value="backend" v-model="areas" />
      <label for="backend">Backend</label>

      <input id="career" type="checkbox" value="career" v-model="areas" />
      <label for="career">Career</label>
    </div>

    <p v-if="!formIsValid">
      Please enter all fields and select at least one area.
    </p>

    <base-button type="submit">Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: "",
      lastName: "",
      description: "",
      rate: null,
      areas: [],
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      if (
        this.firstName.trim() === "" ||
        this.lastName.trim() === "" ||
        this.description.trim() === "" ||
        this.rate === null ||
        this.rate === "" ||
        Number.isNaN(this.rate) ||
        this.rate < 0 ||
        this.areas.length === 0
      ) {
        this.formIsValid = false;
        return;
      }

      this.formIsValid = true;

      const formData = {
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        description: this.description.trim(),
        hourlyRate: this.rate,
        areas: this.areas,
      };

      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
form {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

div {
  margin-bottom: 1rem;
}

label {
  display: inline-block;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

input[type="text"],
input[type="number"],
textarea {
  display: block;
  width: 100%;
  max-width: 30rem;
  padding: 0.5rem;
  font: inherit;
  border: 1px solid #ccc;
  border-radius: 6px;
}

input[type="checkbox"] {
  margin-right: 0.25rem;
}

input[type="checkbox"] + label {
  margin-right: 1rem;
}

p {
  color: #b00020;
  font-weight: 600;
}
</style>
