import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
import { HeaderComponent } from './header/header.component'
import { HomePageComponent } from './home-page.component'

import { HomeRoutingModule } from './home-routing.module';
import { MainMenuComponent } from './main-menu.component'
import { UserNavBarComponent } from './user-nav-bar.component'


@NgModule({
  declarations: [
    HeaderComponent,
    MainMenuComponent,
    HomePageComponent,
    UserNavBarComponent
  ],
  exports: [
    HeaderComponent,
    MainMenuComponent,
    UserNavBarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
