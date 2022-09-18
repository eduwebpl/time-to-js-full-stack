<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <aside>
    <p class="menu-label">Restaurants</p>
    <ul class="menu-list">
      <li>
        <RouterLink activeClass="is-active" class="" to="/restaurants/1"
          >Sea food restaurant</RouterLink
        >
      </li>
      <li>
        <RouterLink activeClass="is-active" class="" to="/restaurants/2"
          >Sooo Fast</RouterLink
        >
      </li>
    </ul>
    <p class="menu-label">Orders</p>
    <ul class="menu-list">
      <li>
        <RouterLink activeClass="is-active" class="" to="/orders/1"
          >28/08 08:22:26</RouterLink
        >
      </li>
      <li>
        <RouterLink activeClass="is-active" class="" to="/orders/2"
          >01/09 12:58:34</RouterLink
        >
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.menu-list a.is-active {
  background-color: #00d1b2;
}
</style>
