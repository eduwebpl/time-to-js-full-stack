import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Credentials } from './credentials'
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseURL = `${environment.baseURL}/users`
  private user: User = {
    id: 1,
    email: '',
    token: ''
  }

  constructor(private httpClient: HttpClient) { }

  signIn(credentials: Credentials) {
      return this.httpClient.post<{token: string}>(this.baseURL+'/sing-in', credentials)
  }

  singOut() {

  }
}
