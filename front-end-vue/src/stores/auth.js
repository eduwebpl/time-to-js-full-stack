import { authResource } from "@/resources/auth.resource";
import { axiosInstance } from "@/resources/axios-instance";
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useMutation } from "vue-query";

export const useAuthStore = defineStore("auth", () => {
  const token = ref("");
  const isAuth = computed(() => Boolean(token.value));

  const {
    mutate: signIn,
    isLoading: isSigningIn,
    error: signInError,
  } = useMutation(
    ({ email, password }) => authResource.signIn(email, password),
    {
      onSuccess: (data) => {
        token.value = data.token;
        axiosInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${data.token}`;
      },
      onError: () => {
        signOut();
      },
    }
  );

  function signOut() {
    token.value = "";
    axiosInstance.defaults.headers["Authorization"] = "";
  }

  return { signIn, isSigningIn, signInError, isAuth, signOut };
});
