import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { formatDate } from "../date.helper";
import { ordersResource } from "../resources/orders.resource";
import { Notification } from "./Notification";
import { ProductListItem } from "./ProductListItem";

export function OrderPage() {
  const { id } = useParams();

  const {
    data: order,
    error,
    isLoading,
  } = useQuery(["orders", id], () => ordersResource.getOne(id), {
    retry: false,
  });

  if (isLoading) {
    return (
      <section>
        <Notification message="Loading order..." />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <Notification message={error.message} type="danger" />
      </section>
    );
  }

  const { products, delivery } = order;
  const backgroundColor =
    {
      IN_PROGRESS: "#e8d592",
      DELIVERED: "rgba(3,175,175,0.16)",
      CANCELED: "#ce3e3e",
    }[delivery?.status] || "";

  return (
    <section>
      <h3 className="is-size-3 my-3">Order from: {formatDate(order?.date)}</h3>
      <div className="box">Restaurant: {order?.restaurant?.name}</div>
      <div className="box">
        Products:
        <ul className="panel">
          {products &&
            products.map((p) => <ProductListItem key={p.id} product={p} />)}
        </ul>
      </div>
      <div className="box" style={{ backgroundColor }}>
        Delivery status:
        <div>
          {delivery?.status} ({formatDate(delivery?.deliveryDate)})
          <hr />
          {delivery?.address}
        </div>
      </div>
    </section>
  );
}
