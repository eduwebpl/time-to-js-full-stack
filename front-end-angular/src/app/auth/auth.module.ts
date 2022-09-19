import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { AuthRoutingModule } from './auth-routing.module';
import { AuthInterceptor } from './auth.interceptor'
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';


@NgModule({
  declarations: [
    SignInPageComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AuthModule { }
