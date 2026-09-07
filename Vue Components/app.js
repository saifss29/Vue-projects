const app = Vue.createApp({
  data() {
    return {
      friends: [
        {
          id: "Manuel",
          name: "Manual Lorenz",
          phone: "01234 5678 991",
          email: "manuel@localhost.com",
        },
        {
          id: "Julie",
          name: "Julie Jones",
          phone: "09876 543 221",
          email: "julie@localhost.com",
        },
      ],
    };
  },
  methods: {
    toggleDetailes() {
      this.detailesAreVisible = !this.detailesAreVisible;
    },
  },
});
app.component("friend-contact", {
  template: `
      <li>
          <h2>{{friend.name}}</h2>
          <button @click="toggleDetailes">
            {{detailesAreVisible ? "Hide" : "Show"}}Details
          </button>
          <ul v-if="detailesAreVisible">
            <li><strong>Phone:</strong> {{friend.phone}}</li>
            <li><strong>Email:</strong> {{friend.email}}</li>
          </ul>
        </li>
   `,
  data() {
    return {
      detailesAreVisible: false,
      friend: {
        id: "Manuel",
        name: "Manual Lorenz",
        phone: "01234 5678 991",
        email: "manuel@localhost.com",
      },
    };
  },
  methods: {
    toggleDetailes() {
      this.detailesAreVisible = !this.detailesAreVisible;
    },
  },
});

app.mount("#app");
