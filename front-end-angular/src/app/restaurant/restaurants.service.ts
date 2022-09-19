import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Restaurant } from './restaurant'

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private readonly baseURL = `${environment.baseURL}/restaurants`

  constructor(private httpClient: HttpClient) { }

  getAll() {
     return this.httpClient.get<Restaurant[]>(this.baseURL)
  }

  getOne(id: number | string) {
    return this.httpClient.get<Restaurant>(this.baseURL + '/' + id)
  }
}
