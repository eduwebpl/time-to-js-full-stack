import { NavLink } from 'react-router-dom';

export function MainMenu() {

    const restaurants = [
        {id: 1, name: 'Food fest'},
        {id: 2, name: 'Burger to go'}
    ];
    const orders = [
        {id: 1, date: '02/09'},
        {id: 2, date: '31/08'}
    ];

	return <aside><p className="menu-label">Restaurants</p>
      <ul className="menu-list">
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
