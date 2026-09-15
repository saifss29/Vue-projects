<template>
  <li>
    <h2>{{ fullName }}</h2>
    <p>${{ rate }}/hour</p>

    <div>
      <span v-for="area in areas" :key="area">{{ area }}</span>
    </div>

    <router-link :to="coachDetailsLink">View Details</router-link>
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

span {
  display: inline-block;
  margin: 0.25rem 0.5rem 0.25rem 0;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background-color: #3d008d;
  color: white;
  font-size: 0.85rem;
}

a {
  display: inline-block;
  margin-top: 1rem;
  color: #3d008d;
  font-weight: 600;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
