import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ordersResource } from "../resources/orders.resource";
import { restaurantsResource } from "../resources/restaurants.resource";
import { Notification } from "./Notification";

export function RestaurantPage() {
  const { id } = useParams();
  const { isAuth } = useContext(AuthContext);
  const [address, setAddress] = useState("");
  const [selectedIds, setSelectedIds] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    setSelectedIds({})
  }, [id])

  const selectedIdKeys = Object.entries(selectedIds)
    .filter(([, value]) => value)
    .map(([key]) => Number(key));

  const isOrderValid = Boolean(selectedIdKeys.length && address);
  const {
    data: restaurant,
    error,
    isLoading,
  } = useQuery(["restaurants", id], () => restaurantsResource.getOne(id));
  const { mutate } = useMutation(({ address, productsIds, restaurantId }) =>
    ordersResource.makeOrder({
      address,
      productsIds,
      restaurantId,
    })
  );

  if (isLoading) {
    return (
      <section>
        <Notification message="Loading restaurant..." />
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

  const { products } = restaurant || {};

  const fullPrice = (products || [])
    .filter((p) => selectedIdKeys.includes(p.id))
    .map((p) => p.price)
    .reduce((a, b) => a + b, 0);

  const handleProductSelectChange =
    (productId) =>
    ({ target }) => {
      setSelectedIds((prevState) => ({
        ...prevState,
        [productId]: target.checked,
      }));
    };

  const handleMakeOrderClick = () => {
    if(!isOrderValid) {
      return
    }
    mutate({address, productsIds: selectedIdKeys, restaurantId: Number(id)}, {
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"])
        setSelectedIds({})
      }
    })
  };

  return (
    <section>
      <h3 className="is-size-3 my-3">{restaurant?.name}</h3>
      <div className="box">{restaurant?.address}</div>
      <article className="panel is-info">
        <p className="panel-heading">Delivery menu</p>
        {products &&
          products.map((p) => (
            <div className="panel-block" key={p.id}>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={selectedIds[p.id] || false}
                  onChange={handleProductSelectChange(p.id)}
                />{" "}
                {p.name} | <code>{p.price}</code> zł
              </label>
            </div>
          ))}
      </article>
      {isAuth && (
        <>
          <div className="box">
            <label>
              <span>Delivery address: </span>
              <textarea
                className="textarea"
                value={address}
                onChange={({ target }) => setAddress(target.value)}
              ></textarea>
            </label>
          </div>
          <div className="is-flex is-justify-content-end">
            <button
              className="button is-link is-light"
              style={{ opacity: isOrderValid ? 1 : 0.5 }}
              onClick={handleMakeOrderClick}
            >
              🛵 Order selected ({fullPrice} zł)
            </button>
          </div>
        </>
      )}
    </section>
  );
}
