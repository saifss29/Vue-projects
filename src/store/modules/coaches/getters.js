export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  shouldUpdate(state) {
    return !state.didFetch;
  },
};
