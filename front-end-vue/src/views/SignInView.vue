<script setup>
import NotificationBox from "@/components/NotificationBox.vue";
import { authResource } from "@/resources/auth.resource";
import { computed, ref } from "vue";
import { useMutation } from "vue-query";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const isValid = computed(() => Boolean(email.value && password.value));
const {
  mutate: signIn,
  isLoading: isSigningIn,
  error: signInError,
} = useMutation(({ email, password }) => authResource.signIn(email, password), {
  onSuccess: () => router.push("/"),
});

async function handleSubmit() {
  if (!isValid.value) {
    return;
  }
  await signIn({ email: email.value, password: password.value });
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
            v-model="email"
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
            v-model="password"
            placeholder="Your password"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button :disabled="isSigningIn" class="button is-link" type="submit">
            Sign in
          </button>
        </div>
      </div>
      <NotificationBox v-if="isSigningIn" message="Loading..." />
      <NotificationBox
        v-if="signInError"
        :message="signInError.message"
        type="danger"
      />
    </form>
  </section>
</template>
