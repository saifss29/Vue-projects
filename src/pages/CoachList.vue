<template>
  <section>
    <h1>Find Your Coach</h1>

    <div class="actions">
      <button @click="loadCoaches(true)">Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>

    <coach-filter @change-filter="setFilters"></coach-filter>

    <p v-if="error">{{ error }}</p>
    <p v-if="isLoading">Loading...</p>

    <ul v-else-if="hasCoaches">
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></coach-item>
    </ul>

    <p v-else>No Coaches Found</p>
  </section>
</template>

<script>
import CoachFilter from "../components/CoachFilter.vue";
import CoachItem from "../components/CoachItem.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    coaches() {
      return this.$store.getters["coaches/coaches"];
    },

    filteredCoaches() {
      return this.coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }

        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }

        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }

        return false;
      });
    },

    hasCoaches() {
      return this.filteredCoaches.length > 0;
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    async loadCoaches(refresh = false) {
      this.isLoading = true;
      this.error = null;

      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
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
  margin-bottom: 1rem;
}

a {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #3d008d;
  font-weight: 600;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

p {
  font-weight: 600;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: #3d008d;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #27005d;
}
</style>
