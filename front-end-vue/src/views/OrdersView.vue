<script setup>
import NotificationBox from "@/components/NotificationBox.vue";
import ProductListItem from "@/components/ProductListItem.vue";
import { ordersResource } from "@/resources/orders.resource";
import { formatDate } from "@/date.helper";
import { watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "vue-query";

const route = useRoute();
const {
  data: order,
  error,
  isLoading,
  refetch,
} = useQuery(["orders", route.params.id], () =>
  ordersResource.getOne(route.params.id)
);

const deliveryDate = computed(() =>
  formatDate(order.value?.delivery?.deliveryDate)
);
const backgroundColor = computed(() => {
  return (
    {
      IN_PROGRESS: "#e8d592",
      DELIVERED: "rgba(3,175,175,0.16)",
      CANCELED: "#ce3e3e",
    }[order.value?.delivery?.status] || ""
  );
});

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
  <section v-if="order">
    <h3 class="is-size-3 my-3">Order from: {{ formatDate(order.date) }}</h3>
    <div class="box">Restaurant: {{ order?.restaurant?.name }}</div>
    <div class="box">
      Products:
      <ul>
        <ProductListItem
          v-for="product of order?.products"
          :key="product.id"
          :name="product.product.name"
          :price="product.price"
        />
      </ul>
    </div>
    <div class="box" :style="{ backgroundColor }">
      Delivery status:
      <div>
        {{ order?.delivery?.status }} ({{ deliveryDate }})
        <hr />
        {{ order?.delivery?.address }}
      </div>
    </div>
  </section>
</template>
