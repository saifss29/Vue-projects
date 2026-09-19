export default {
  async registerCoach(context, data) {
    const idToken = context.rootState.auth.token;

    if (!idToken) {
      throw new Error("You must be logged in to register a coach.");
    }

    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      hourlyRate: data.hourlyRate,
      areas: data.areas,
    };

    const response = await fetch(
      `https://vue-http-demo-1334e-default-rtdb.firebaseio.com/coaches.json?auth=${encodeURIComponent(
        idToken,
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coachData),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to register coach.");
    }

    const responseData = await response.json();

    context.commit("registerCoach", {
      ...coachData,
      id: responseData.name,
    });
  },

  async loadCoaches(context, payload = { forceRefresh: false }) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      "https://vue-http-demo-1334e-default-rtdb.firebaseio.com/coaches.json",
    );

    if (!response.ok) {
      throw new Error("Failed to load coaches.");
    }

    const responseData = await response.json();

    if (!responseData) {
      context.commit("setCoaches", []);
      return;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };

      coaches.push(coach);
    }

    context.commit("setCoaches", coaches);
  },
};
