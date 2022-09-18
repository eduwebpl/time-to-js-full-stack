import { axiosInstance } from "./axios-instance";

const URN = "/users";

export const authResource = {
  signIn(email = "", password = "") {
    return axiosInstance
      .post(`${URN}/sign-in`, { email, password })
      .then((data) => {
        axiosInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${data.token}`;
        return data;
      })
      .catch((error) => {
        axiosInstance.defaults.headers["Authorization"] = "";
        throw error;
      });
  },
};
