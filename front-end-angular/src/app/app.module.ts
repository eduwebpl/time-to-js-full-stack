import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RestaurantModule } from './restaurant/restaurant.module';
import { AuthModule } from './auth/auth.module';
import { UserNavBarComponent } from './user-nav-bar/user-nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMenuComponent,
    HomePageComponent,
    UserNavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RestaurantModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
