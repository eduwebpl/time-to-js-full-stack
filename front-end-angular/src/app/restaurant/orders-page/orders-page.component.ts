import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { Order } from '../order'
import { OrdersService } from '../orders.service'

@Component({
  template: `
    <section *ngIf="order">
      <h3 class="is-size-3 my-3">Order from: {{order.date | date:"dd/MM HH:mm"}}</h3>
      <div class="box">Restaurant: {{order.restaurant.name}}</div>
      <div class="box">Products:
        <ul>
          <li *ngFor="let product of order.products"> {{product.price}} PLN</li>
        </ul>
      </div>
      <div class="box" [ngStyle]="statusStyle">Delivery status:
        <div>
          {{order.delivery?.status}} {{order.delivery?.deliveryDate | date:"dd/MM HH:mm"}}
          <hr>
          {{order.delivery?.address}}
        </div>
      </div>
    </section>
  `,
  styles: [
  ]
})
export class OrdersPageComponent implements OnInit {

  order?: Order

  constructor(private ordersService :OrdersService,  private activatedRoute :ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap((params: Params) => this.ordersService.getOne(params['id'])))
      .subscribe(newOrder => {
        this.order = newOrder
      })
  }

  get statusStyle() {
    const backgroundColor = {
          IN_PROGRESS: "#e8d592",
          DELIVERED: "rgba(3,175,175,0.16)",
          CANCELED: "#ce3e3e",
        }[this.order?.delivery?.status || 'IN_PROGRESS']
    return { backgroundColor }
  }
}
