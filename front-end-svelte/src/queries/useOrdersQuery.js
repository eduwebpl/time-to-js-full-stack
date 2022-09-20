import { ordersResource } from "../resources/orders.resource";
import { useQuery, useQueryClient } from "@sveltestack/svelte-query";

const QUERY_KEY = "orders";

export function useOrdersQuery() {
  return useQuery([QUERY_KEY], ordersResource.getAll);
}

export function useOrderQuery(id) {
  return useQuery([QUERY_KEY, id], () => ordersResource.getOne(id), { retry: false });
}

export function invalidateOrders() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries([QUERY_KEY]);
}
