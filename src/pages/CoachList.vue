<template>
  <base-card>
    <h1>Find Your Coach</h1>

    <div class="actions">
      <base-button mode="outline" @click="loadCoaches(true)">
        Refresh
      </base-button>
      <base-button link to="/register">Register as Coach</base-button>
    </div>

    <coach-filter @change-filter="setFilters"></coach-filter>

    <base-dialog
      v-if="error"
      title="Could not load coaches"
      @close="error = null"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <base-spinner v-if="isLoading" />

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
  </base-card>
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
h1 {
  margin-bottom: 1rem;
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

</style>
