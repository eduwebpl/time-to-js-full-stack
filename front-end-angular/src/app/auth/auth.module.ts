import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { AuthRoutingModule } from './auth-routing.module';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';


@NgModule({
  declarations: [
    SignInPageComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule
    ]
})
export class AuthModule { }
