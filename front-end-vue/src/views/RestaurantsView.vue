<script setup>
import NotificationBox from "@/components/NotificationBox.vue";
import { invalidateOrders } from "@/queries/useOrdersQuery";
import { ordersResource } from "@/resources/orders.resource";
import { useAuthStore } from "@/stores/auth";
import { watch, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { restaurantsResource } from "@/resources/restaurants.resource";
import { useMutation, useQuery } from "vue-query";

const route = useRoute();
const authStore = useAuthStore();
const address = ref("");
const selectedIds = ref({});
const selectedIdKeys = computed(() =>
  Object.entries(selectedIds.value)
    .filter(([, value]) => value)
    .map(([key]) => Number(key))
);
const isOrderValid = computed(() =>
  Boolean(selectedIdKeys.value.length && address.value)
);
const invalidate = invalidateOrders();
const {
  data: restaurant,
  error,
  isLoading,
  refetch,
} = useQuery(["restaurants", route.params.id], () =>
  restaurantsResource.getOne(route.params.id)
);
const { mutate } = useMutation(({ address, productsIds, restaurantId }) =>
  ordersResource.makeOrder({
    address,
    productsIds,
    restaurantId,
  })
);

const fullPrice = computed(() =>
  (restaurant.value?.products || [])
    .filter((p) => selectedIdKeys.value.includes(p.id))
    .map((p) => p.price)
    .reduce((a, b) => a + b, 0)
);

const handleMakeOrderClick = async () => {
  if (!isOrderValid.value) {
    return;
  }
  await mutate(
    {
      address: address.value,
      productsIds: selectedIdKeys.value,
      restaurantId: Number(route.params.id),
    },
    {
      onSuccess: () => {
        invalidate();
        selectedIds.value = {};
      },
    }
  );
};

watch(
  () => route.params.id,
  () => {
    refetch.value();
    selectedIds.value = {};
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
          ><input type="checkbox" v-model="selectedIds[product.id]" />
          {{ product.name }} | {{ product.price }}zł</label
        >
      </div>
    </article>
    <template v-if="authStore.isAuth">
      <div class="box">
        <label>
          <span>Delivery address: </span>
          <textarea class="textarea" v-model="address"></textarea>
        </label>
      </div>
      <div class="is-flex is-justify-content-end">
        <button
          class="button is-link is-light"
          :style="{ opacity: isOrderValid ? 1 : 0.5 }"
          @click="handleMakeOrderClick"
        >
          🛵 Order selected ({{ fullPrice }} zł)
        </button>
      </div>
    </template>
  </section>
</template>
