import { ordersResource } from "@/resources/orders.resource";
import { useQuery, useQueryClient } from "vue-query";

const QUERY_KEY = "orders";

export function useOrdersQuery() {
  const {
    isLoading: isOrdersLoading,
    error: ordersError,
    data: orders,
  } = useQuery([QUERY_KEY], ordersResource.getAll);

  return { isOrdersLoading, ordersError, orders };
}

export function invalidateOrders() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries([QUERY_KEY]);
}
