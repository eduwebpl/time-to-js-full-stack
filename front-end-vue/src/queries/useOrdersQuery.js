import { ordersResource } from "@/resources/orders.resource";
import { useQuery } from "vue-query";

const QUERY_KEY = "orders";

export function useOrdersQuery() {
  const {
    isLoading: isOrdersLoading,
    error: ordersError,
    data: orders,
  } = useQuery([QUERY_KEY], ordersResource.getAll);

  return { isOrdersLoading, ordersError, orders };
}
