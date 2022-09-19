import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersPageComponent } from './orders-page/orders-page.component'
import { RestaurantsPageComponent } from './restaurants-page/restaurants-page.component'

const routes: Routes = [
  { path: 'restaurants/:id', component: RestaurantsPageComponent },
  { path: 'orders/:id', component: OrdersPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
