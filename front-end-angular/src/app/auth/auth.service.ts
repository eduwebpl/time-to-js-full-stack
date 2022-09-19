import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Credentials } from './credentials'
import { User } from './user'

const ANONYMOUS_USER: User = {
  id: 1,
  email: '',
  token: ''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseURL = `${environment.baseURL}/users`
  private readonly userSubject = new BehaviorSubject(ANONYMOUS_USER)

  public token$ = this.userSubject.pipe(map(({token}) => token))
  public isAuth$ = this.token$.pipe(map(token=> Boolean(token)))

  constructor(private httpClient: HttpClient) { }

  signIn(credentials: Credentials) {
      return this.httpClient.post<{token: string}>(this.baseURL+'/sign-in', credentials)
        .pipe(
          tap(({token}) => {
            this.userSubject.next({
              id: 1,
              email: credentials.email,
              token
            })
          }),
          catchError((err) => {
            this.singOut()
            throw err
          })
        )
  }

  singOut() {
    this.userSubject.next(ANONYMOUS_USER)
  }
}
