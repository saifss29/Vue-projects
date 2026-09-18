<template>
  <base-card v-if="isLoading">
    <base-spinner />
  </base-card>
  <base-card v-else-if="selectedCoach">
    <h1>{{ fullName }}</h1>
    <p>${{ selectedCoach.hourlyRate }}/hour</p>

      <div>
        <base-badge
          v-for="area in selectedCoach.areas"
          :key="area"
          :type="area"
          :title="area"
        />
      </div>

    <p>{{ selectedCoach.description }}</p>
    <base-button link :to="contactLink">Contact</base-button>
    <router-view></router-view>
  </base-card>
  <base-card v-else>
    <h1>Coach not found</h1>
    <p v-if="error">{{ error }}</p>
    <p>Please go back to coaches list</p>
  </base-card>
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
  watch: {
    id() {
      this.loadCoach();
    },
  },
  methods: {
    async loadCoach() {
      this.isLoading = true;
      this.error = null;
      this.selectedCoach = null;

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

</style>
