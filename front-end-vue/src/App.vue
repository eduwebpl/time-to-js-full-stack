<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheMenu from "@/components/TheMenu.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <main class="container">
    <TheHeader />
    <section class="is-flex is-justify-content-end">
      <RouterLink class="icon-text" to="/sign-in">
        <div class="box icon">🔑</div>
      </RouterLink>
    </section>
    <div class="columns">
      <div class="column is-2">
        <TheMenu />
      </div>
      <div class="column">
        <RouterView />
      </div>
    </div>
  </main>
</template>
