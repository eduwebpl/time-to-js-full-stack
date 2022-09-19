import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import { Order } from '../restaurant/order'
import { OrdersService } from '../restaurant/orders.service'
import { Restaurant } from '../restaurant/restaurant'
import { RestaurantsService } from '../restaurant/restaurants.service'

@Component({
  selector: 'app-main-menu',
  template: `
    <aside>
      <p class="menu-label">Restaurants</p>
      <ul class="menu-list">
        <li *ngFor="let restaurant of restaurants">
          <a [routerLink]="'/restaurants/' + restaurant.id">{{restaurant.name}}</a>
        </li>
      </ul>
      <p class="menu-label">Orders</p>
      <ul class="menu-list">
        <li *ngIf="isOrdersLoading">
            <app-notification message="Orders loading.."></app-notification>
        </li>
        <li *ngIf="ordersErrorMessage">
          <app-notification [message]="ordersErrorMessage" type="danger"></app-notification>
        </li>
        <li *ngFor="let order of orders">
          <a [routerLink]="'/orders/' + order.id">{{order.date}}</a>
        </li>
      </ul>
    </aside>
  `,
  styles: [
  ]
})
export class MainMenuComponent implements OnInit {

  restaurants: Restaurant[] = []

  isOrdersLoading = false
  ordersErrorMessage = ''
  orders: Order[] = [ ]

  constructor(private restaurantsService: RestaurantsService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.restaurantsService.getAll().subscribe((restaurants) => {
         this.restaurants = restaurants
    })

    this.isOrdersLoading = true
    this.ordersService.getAll().subscribe({
      next: (orders) => {
        this.orders = orders
        this.isOrdersLoading = false
      },
      error: (err: HttpErrorResponse) => {
        this.ordersErrorMessage = err.error?.message || err.message
        this.isOrdersLoading = false
      }
    })
  }

}
