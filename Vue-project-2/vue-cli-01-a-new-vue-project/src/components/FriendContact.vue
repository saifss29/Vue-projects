<template>
  <li>
    <h2>{{ name }} {{ isFavorite ? "(Favorite)" : "" }}</h2>
    <button @click="toggleFavorite">toggle favorite</button>
    <button @click="toggleDetails">
      {{ showDetails ? "Hide" : "Show" }} Details
    </button>
    <ul v-if="showDetails">
      <li><strong>Phone:</strong>{{ phoneNumber }}</li>
      <li><strong>Email:</strong>{{ emailAddress }}</li>
    </ul>
    <button @click="$emit('delete', id)">Delete</button>
  </li>
</template>

<script>
export default {
  // props: ["name", "phoneNumber", "emailAddress"],
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["toggle-favorite", "delete"],

  data() {
    return {
      showDetails: false,
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    toggleFavorite() {
      this.$emit("toggle-favorite", this.id);
    },
  },
};
</script>
