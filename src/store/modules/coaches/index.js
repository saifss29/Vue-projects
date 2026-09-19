import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
export default {
  namespaced: true,
  state() {
    return {
      coaches: [],
      didFetch: false,
    };
  },
  getters: getters,
  actions: actions,
  mutations: mutations,
};
