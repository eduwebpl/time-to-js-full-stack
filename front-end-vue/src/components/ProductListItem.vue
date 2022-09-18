<script setup>
defineProps({
  name: {
    type: String,
    default: "",
  },
  price: {
    type: [String, Number],
    required: true,
  },
});
</script>

<template>
  <li class="panel-block is-flex is-justify-content-space-between">
    {{ name }}
    <code class="ml-auto mr-2">{{ price }}</code> PLN
  </li>
</template>
