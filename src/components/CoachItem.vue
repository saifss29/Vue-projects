<template>
  <li>
    <h2>{{ fullName }}</h2>
    <p>${{ rate }}/hour</p>

    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      />
    </div>

    <base-button link :to="coachDetailsLink">View Details</base-button>
  </li>
</template>

<script>
export default {
  props: ["id", "firstName", "lastName", "rate", "areas"],
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    coachDetailsLink() {
      return "/coaches/" + this.id;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h2 {
  margin: 0 0 0.5rem;
}

p {
  margin: 0.5rem 0;
  font-weight: 600;
}

</style>
