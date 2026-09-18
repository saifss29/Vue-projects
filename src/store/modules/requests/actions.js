export default {
  async contactCoach(context, payload) {
    const newRequest = {
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      "https://vue-http-demo-1334e-default-rtdb.firebaseio.com/requests.json",
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to send request.");
    }

    const responseData = await response.json();

    context.commit("addRequest", {
      ...newRequest,
      id: responseData.name,
    });
  },

  async loadRequests(context) {
    const idToken = context.rootState.auth.token;

    if (!idToken) {
      throw new Error("You must be logged in to view requests.");
    }

    const response = await fetch(
      `https://vue-http-demo-1334e-default-rtdb.firebaseio.com/requests.json?auth=${encodeURIComponent(
        idToken,
      )}`,
    );

    if (!response.ok) {
      throw new Error("Failed to load requests.");
    }

    const responseData = await response.json();

    if (!responseData) {
      context.commit("setRequests", []);
      return;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: responseData[key].coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };

      requests.push(request);
    }

    context.commit("setRequests", requests);
  },
};
