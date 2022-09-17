import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { restaurantsResource } from "../resources/restaurants.resource";
import { Notification } from './Notification';

export function RestaurantPage() {
  const { id } = useParams();

  const {
    data: restaurant,
    error,
    isLoading,
  } = useQuery(["restaurants", id], () => restaurantsResource.getOne(id));

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

  const { products } = restaurant || {}

  return (
    <section>
      <h3 className="is-size-3 my-3">{restaurant?.name}</h3>
      <div className="box">{restaurant?.address}</div>
      <article className="panel is-info">
        <p className="panel-heading">Delivery menu</p>
          {
            products &&
            products.map(p => (
              <div className="panel-block" key={p.id}>
              <label className="checkbox" >
                <input type="checkbox" /> {p.name} | <code>{p.price}</code> zł
              </label>
              </div>
            ))
          }
      </article>
    </section>
  );
}
