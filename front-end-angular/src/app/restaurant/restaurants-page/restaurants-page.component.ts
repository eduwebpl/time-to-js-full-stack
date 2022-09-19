import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { switchMap, tap } from 'rxjs/operators'
import { AuthService } from '../../auth/auth.service'
import { OrdersService } from '../orders.service'
import { Restaurant } from '../restaurant'
import { RestaurantsService } from '../restaurants.service'

@Component({
  template: `
    <section *ngIf="restaurant">
      <h3 class="is-size-3 my-3">{{restaurant.name}}</h3>
      <div class="box">{{restaurant.address}}</div>
      <article class="panel is-info"><p class="panel-heading">Delivery menu</p>
        <div class="panel-block" *ngFor="let product of restaurant.products">
          <label class="checkbox">
            <input type="checkbox" [(ngModel)]="selectedIds[product.id]" > {{product.name}} | {{product.price}}zł
          </label>
        </div>
      </article>
      <ng-container *ngIf="authService.isAuth$ | async">
        <div class="box">
          <label>
            <span>Delivery address: </span>
            <textarea class="textarea" [(ngModel)]="address"></textarea>
          </label>
        </div>
        <div class="is-flex is-justify-content-end">
          <button
                class="button is-link is-light"
                (click)="handleMakeOrderClick()"
                  [ngStyle]="{opacity: isOrderValid ? 1 : 0.5}">🛵 Order selected ({{fullPrice}} zł)</button>
        </div>
      </ng-container>
    </section>
  `,
  styles: [
  ]
})
export class RestaurantsPageComponent implements OnInit {

  restaurantId = 0
  address = ''
  selectedIds: { [key: number] : boolean} = {}
  restaurant?: Restaurant

  constructor(public authService :AuthService, private activatedRoute :ActivatedRoute, private restaurantsService :RestaurantsService, private ordersService :OrdersService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap((params: Params) => {
          this.restaurantId = Number(params['id'])
          this.selectedIds = {}
        }),
        switchMap((params: Params) => this.restaurantsService.getOne(params['id'])))
      .subscribe(newRestaurant => {
       this.restaurant = newRestaurant
    })
  }

  get selectedIdKeys(): number[] {
      return  Object.entries(this.selectedIds)
        .filter(([, value]) => value)
        .map(([key]) => Number(key))
  }

  get isOrderValid(): boolean  {
    return Boolean(this.selectedIdKeys.length && this.address)
  }

  get fullPrice(): number {
     return (this.restaurant?.products || [])
       .filter((p) => this.selectedIdKeys.includes(p.id))
       .map((p) => p.price)
       .reduce((a, b) => a + b, 0)
  }

  handleMakeOrderClick() {
    if (!this.isOrderValid) {
      return;
    }
    this.ordersService.makeOrder({
      address: this.address,
      restaurantId: this.restaurantId,
      productsIds: this.selectedIdKeys
    }).subscribe(() => {
      this.selectedIds = {}
    })
  }
}
