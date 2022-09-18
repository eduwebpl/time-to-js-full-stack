<script setup>
import NotificationBox from "@/components/NotificationBox.vue";
import { formatDate } from "@/date.helper";
import { useOrdersQuery } from "@/queries/useOrdersQuery";
import { restaurantsResource } from "@/resources/restaurants.resource";
import { useQuery } from "vue-query";
import { RouterLink } from "vue-router";

const {
  isLoading,
  error,
  isError,
  data: restaurants,
} = useQuery(["restaurants"], restaurantsResource.getAll);

const { isOrdersLoading, ordersError, orders } = useOrdersQuery();
</script>

<template>
  <aside>
    <p class="menu-label">Restaurants</p>
    <ul class="menu-list">
      <li v-if="isLoading">
        <NotificationBox message="Loading..." />
      </li>
      <li v-if="isError">
        <NotificationBox :message="error.message" type="danger" />
      </li>
      <li v-for="restaurant of restaurants" :key="restaurant.id">
        <RouterLink
          activeClass="is-active"
          :to="`/restaurants/${restaurant.id}`"
        >
          {{ restaurant.name }}
        </RouterLink>
      </li>
    </ul>
    <p class="menu-label">Orders</p>
    <ul class="menu-list">
      <li v-if="isOrdersLoading">
        <NotificationBox message="Loading orders..." />
      </li>
      <li v-if="ordersError">
        <NotificationBox :message="ordersError.message" type="danger" />
      </li>
      <li v-for="order of orders" :key="order.id">
        <RouterLink activeClass="is-active" :to="`/orders/${order.id}`">
          {{ formatDate(order.date) }}
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.menu-list a.is-active {
  background-color: #00d1b2;
}
</style>
