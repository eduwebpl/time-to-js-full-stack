<script setup>
defineProps({
  type: {
    type: String,
    default: "info",
  },
  message: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="['notification', `is-${type}`]">
    {{ message }}
  </div>
  ;
</template>
