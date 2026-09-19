<template>
  <header>
    <nav>
      <h1>Coach Finder</h1>
      <router-link to="/coaches">Coaches</router-link>
      <router-link to="/requests">Requests</router-link>
      <router-link to="/auth" v-if="!isLoggedIn">Login</router-link>
      <button v-else @click="logout">Logout</button>
    </nav>
  </header>

  <router-view></router-view>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style scoped>
header {
  background-color: #3d008d;
  padding: 1rem;
}

nav {
  max-width: 60rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

h1 {
  color: white;
  margin-right: auto;
}

a,
button {
  color: white;
  background: transparent;
  border: none;
  font: inherit;
  cursor: pointer;
  text-decoration: none;
}

a.router-link-active {
  border-bottom: 2px solid white;
}
</style>
