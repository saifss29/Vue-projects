<template>
  <section v-if="isLoading">
    <p>Loading...</p>
  </section>
  <section v-else-if="selectedCoach">
    <h1>{{ fullName }}</h1>
    <p>${{ selectedCoach.hourlyRate }}/hour</p>

    <div>
      <span v-for="area in selectedCoach.areas" :key="area">
        {{ area }}
      </span>
    </div>

    <p>{{ selectedCoach.description }}</p>
    <router-link :to="contactLink">Contact</router-link>
    <router-view></router-view>
  </section>
  <section v-else>
    <h1>Coach not found</h1>
    <p v-if="error">{{ error }}</p>
    <p>Please go back to coaches list</p>
  </section>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    fullName() {
      if (!this.selectedCoach) {
        return "";
      }
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    contactLink() {
      return "/coaches/" + this.id + "/contact";
    },
  },
  created() {
    this.loadCoach();
  },
  methods: {
    async loadCoach() {
      this.isLoading = true;
      this.error = null;

      try {
        await this.$store.dispatch("coaches/loadCoaches");
        const coaches = this.$store.getters["coaches/coaches"];
        this.selectedCoach = coaches.find((coach) => coach.id === this.id);
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
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h1 {
  margin-top: 0;
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
  margin: 1rem 0;
  color: #3d008d;
  font-weight: 600;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
