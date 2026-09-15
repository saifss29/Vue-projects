const API_KEY = "AIzaSyDQHqa-WtcAdoJDvW9fjCQZvFfPlpO4H9M";

function getAuthErrorMessage(errorCode) {
  if (errorCode === "EMAIL_EXISTS") {
    return "This email is already registered.";
  }

  if (errorCode === "EMAIL_NOT_FOUND") {
    return "No account was found with this email.";
  }

  if (errorCode === "INVALID_PASSWORD") {
    return "The password is incorrect.";
  }

  if (errorCode === "INVALID_LOGIN_CREDENTIALS") {
    return "The email or password is incorrect.";
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

  return errorCode || "Failed to authenticate.";
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

      throw new Error(getAuthErrorMessage(errorCode));
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
