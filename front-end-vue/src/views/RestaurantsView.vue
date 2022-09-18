<script setup>
import NotificationBox from "@/components/NotificationBox.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { restaurantsResource } from "@/resources/restaurants.resource";
import { useQuery } from "vue-query";

const route = useRoute();
const isAuth = ref(false);
const {
  data: restaurant,
  error,
  isLoading,
  refetch,
} = useQuery(["restaurants", route.params.id], () =>
  restaurantsResource.getOne(route.params.id)
);

watch(
  () => route.params.id,
  () => {
    refetch.value();
  }
);
</script>

<template>
  <NotificationBox v-if="isLoading" message="Loading restaurant..." />
  <NotificationBox v-if="error" :message="error.message" type="danger" />
  <section v-if="restaurant">
    <h3 class="is-size-3 my-3">{{ restaurant.name }}</h3>
    <div class="box">{{ restaurant.address }}</div>
    <article class="panel is-info">
      <p class="panel-heading">Delivery menu</p>
      <div
        class="panel-block"
        v-for="product of restaurant.products"
        :key="product.id"
      >
        <label class="checkbox"
          ><input type="checkbox" /> {{ product.name }} |
          {{ product.price }}zł</label
        >
      </div>
    </article>
    <template v-if="isAuth">
      <div class="box">
        <label>
          <span>Delivery address: </span>
          <textarea class="textarea"></textarea>
        </label>
      </div>
      <div class="is-flex is-justify-content-end">
        <button class="button is-link is-light" style="opacity: 0.5">
          🛵 Order selected (0.00 zł)
        </button>
      </div>
    </template>
  </section>
</template>
