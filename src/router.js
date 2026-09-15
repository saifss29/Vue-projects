import { createRouter, createWebHistory } from "vue-router";

import CoachList from "./pages/CoachList.vue";
import CoachDetail from "./pages/CoachDetail.vue";
import ContactCoach from "./pages/ContactCoach.vue";
import CoachRegistration from "./pages/CoachRegistration.vue";
import RequestsReceived from "./pages/RequestsReceived.vue";
import UserAuth from "./pages/UserAuth.vue";
import NotFound from "./pages/NotFound.vue";
import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [
        {
          path: "contact",
          component: ContactCoach,
        },
      ],
    },
    {
      path: "/register",
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: "/auth", component: UserAuth },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]) {
    next("/auth");
  } else {
    next();
  }
});

export default router;
