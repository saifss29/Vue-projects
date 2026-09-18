const API_KEY = "AIzaSyDQHqa-WtcAdoJDvW9fjCQZvFfPlpO4H9M";

function getAuthErrorMessage(errorCode, mode) {
  const loginErrorCodes = [
    "EMAIL_NOT_FOUND",
    "INVALID_PASSWORD",
    "INVALID_LOGIN_CREDENTIALS",
  ];

  if (mode === "login" && loginErrorCodes.includes(errorCode)) {
    return "Invalid email or password.";
  }

  if (mode === "signup" && errorCode === "EMAIL_EXISTS") {
    return "Unable to complete signup.";
  }

  if (errorCode === "OPERATION_NOT_ALLOWED") {
    return "Email/password login is not enabled in Firebase Authentication.";
  }

  if (errorCode === "TOO_MANY_ATTEMPTS_TRY_LATER") {
    return "Too many attempts. Please try again later.";
  }

  if (errorCode === "API_KEY_INVALID") {
    return "The Firebase API key is invalid.";
  }

  return "Failed to authenticate. Please try again.";
}

export default {
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },

  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },

  async auth(context, payload) {
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      API_KEY;

    if (payload.mode === "login") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        API_KEY;
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorCode =
        responseData.error && responseData.error.message
          ? responseData.error.message
          : null;

      throw new Error(getAuthErrorMessage(errorCode, payload.mode));
    }

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },

  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
};
