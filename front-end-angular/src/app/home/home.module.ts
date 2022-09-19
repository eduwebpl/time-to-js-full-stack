import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    HomeRoutingModule
  ]
})
export class HomeModule { }
