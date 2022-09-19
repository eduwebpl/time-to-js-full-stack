<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheMenu from "@/components/TheMenu.vue";
import UserNavBar from "@/components/UserNavBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <main class="container">
    <TheHeader />
    <UserNavBar />
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
