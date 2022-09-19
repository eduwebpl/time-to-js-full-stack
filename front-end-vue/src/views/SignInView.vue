<script setup>
import NotificationBox from "@/components/NotificationBox.vue";
import { invalidateOrders } from "@/queries/useOrdersQuery";
import { useAuthStore } from "@/stores/auth";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";

const credentials = reactive({ email: "", password: "" });
const router = useRouter();
const invalidate = invalidateOrders();
const isValid = computed(() =>
  Boolean(credentials.email && credentials.password)
);
const authStore = useAuthStore();

async function handleSubmit() {
  if (!isValid.value) {
    return;
  }
  await authStore.signIn(credentials, {
    onSuccess: () => router.push("/"),
    onSettled: () => invalidate(),
  });
}
</script>

<template>
  <section>
    <h3 class="is-size-3 my-3">Sign to place the Order</h3>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label">E-mail</label>
        <div class="control">
          <input
            name="email"
            class="input"
            type="email"
            v-model="credentials.email"
            placeholder="Your e-mail"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            name="password"
            class="input"
            type="password"
            v-model="credentials.password"
            placeholder="Your password"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button
            :disabled="authStore.isSigningIn"
            class="button is-link"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </div>
      <NotificationBox v-if="authStore.isSigningIn" message="Loading..." />
      <NotificationBox
        v-if="authStore.signInError"
        :message="authStore.signInError.message"
        type="danger"
      />
    </form>
  </section>
</template>
