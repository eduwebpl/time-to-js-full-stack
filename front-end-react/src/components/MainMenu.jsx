import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { restaurantsResource } from '../resources/restaurants.resource';
import { Notification } from './Notification';

export function MainMenu() {

    // let restaurants = [];
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [restaurants, setRestaurants] = useState([])

    const orders = [
        {id: 1, date: '02/09'},
        {id: 2, date: '31/08'}
    ];

    useEffect(() => {

      restaurantsResource.getAll()
        .then((data) => {
          // console.log(data)
          setRestaurants(data)
        }).catch(err => {
          setError(err)
        }).finally(() => {
          setLoading(false)
        })
    }, [])

	return <aside><p className="menu-label">Restaurants</p>
      <ul className="menu-list">
          {
            loading &&
            <Notification message="Loading..." />
          }
          {
            error &&
            <Notification type="danger" message={error.message} />
          }
          {
              restaurants.map(restaurant => <li key={restaurant.id}>
                  <NavLink to={`/restaurant/${restaurant.id}`}>{restaurant.name}</NavLink>
              </li>)
          }
      </ul>
      <p className="menu-label">Orders</p>
      <ul className="menu-list">
          {
              orders.map(order => <li key={order.id}>
                <NavLink to={`/order/${order.id}`}>{order.date}</NavLink>
              </li>)
          }
      </ul>
  </aside>;
}
