<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <section class="is-flex is-justify-content-end">
    <button
      v-if="authStore.isAuth"
      class="button is-warning"
      @click="authStore.signOut"
    >
      ⤴
    </button>
    <RouterLink v-else class="icon-text" to="/sign-in">
      <div class="box icon">🔑</div>
    </RouterLink>
  </section>
</template>
