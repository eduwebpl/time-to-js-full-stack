import { Component, OnInit } from '@angular/core';

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

  restaurants = [
    {id: 1, name: 'Sea food restaurant'},
    {id: 2, name: 'Sooo Fast'}
  ]

  orders = [
    {id: 1, date: '01/09'},
    {id: 2, date: '14/09'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
