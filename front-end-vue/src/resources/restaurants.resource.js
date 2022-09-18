import { axiosInstance } from "./axios-instance";

const URN = "/restaurants";

export const restaurantsResource = {
  getAll() {
    return axiosInstance.get(URN);
  },
  getOne(id) {
    return axiosInstance.get(`${URN}/${id}`);
  },
};
