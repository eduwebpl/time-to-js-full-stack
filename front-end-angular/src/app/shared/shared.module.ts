import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { NotificationComponent } from './notification.component';



@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NotificationComponent,
    FormsModule
  ]
})
export class SharedModule { }
