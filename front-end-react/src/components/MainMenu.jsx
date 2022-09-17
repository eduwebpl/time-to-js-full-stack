import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { ordersResource } from '../resources/orders.resource';
import { restaurantsResource } from '../resources/restaurants.resource';
import { Notification } from './Notification';

export function MainMenu() {

    // let restaurants = [];
    const {isLoading, error, isError, data: restaurants} = useQuery(['restaurants'], restaurantsResource.getAll)

    const {isLoading: isOrdersLoading, error: ordersError, data: orders} = useQuery(['orders'], ordersResource.getAll)



	return <aside><p className="menu-label">Restaurants</p>
      <ul className="menu-list">
          {
            isLoading &&
            <Notification message="Loading..." />
          }
          {
            isError &&
            <Notification type="danger" message={error.message} />
          }
          {
            restaurants &&
              restaurants.map(restaurant => <li key={restaurant.id}>
                  <NavLink to={`/restaurant/${restaurant.id}`}>{restaurant.name}</NavLink>
              </li>)
          }
      </ul>
      <p className="menu-label">Orders</p>
      <ul className="menu-list">
        {
          isOrdersLoading &&
          <Notification message="Loading..." />
        }
        {
          ordersError &&
          <Notification type="danger" message={ordersError.message} />
        }
          {
            orders &&
              orders.map(order => <li key={order.id}>
                <NavLink to={`/order/${order.id}`}>{order.date}</NavLink>
              </li>)
          }
      </ul>
  </aside>;
}
