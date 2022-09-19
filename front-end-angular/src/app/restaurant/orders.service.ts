import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Order } from './order'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly baseURL = `${environment.baseURL}/orders`

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Order[]>(this.baseURL).pipe(retry(3))
  }

  getOne(id: number | string) {
    return this.httpClient.get<Order>(this.baseURL + '/' + id)
  }
}
