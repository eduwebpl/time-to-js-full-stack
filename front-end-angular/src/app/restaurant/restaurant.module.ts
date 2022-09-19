import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';


@NgModule({
  declarations: [
    RestaurantsPageComponent,
    OrdersPageComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule
  ]
})
export class RestaurantModule { }
