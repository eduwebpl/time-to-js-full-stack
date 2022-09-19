import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div class="notification" [ngClass]="'is-' + type">
        {{ message }}
    </div>
  `,
  styles: [
  ]
})
export class NotificationComponent implements OnInit {

  @Input() message = ''
  @Input() type = 'info'

  constructor() { }

  ngOnInit(): void {
  }

  // get typeClass(): string {
  //   return `is-${this.type}`
  // }
}
