import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RestaurantsView from "../views/RestaurantsView.vue";
import OrdersView from "../views/OrdersView.vue";
import SignInView from "../views/SignInView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/restaurants/:id",
      component: RestaurantsView,
    },
    {
      path: "/orders/:id",
      component: OrdersView,
    },
    {
      path: "/sign-in",
      component: SignInView,
    },
  ],
});

export default router;
