import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-user-nav-bar',
  template: `
    <section class="is-flex is-justify-content-end">
      <button *ngIf="authService.isAuth$ | async; else signIn"
              class="button is-warning"
              (click)="authService.singOut()">⤴</button>
      <ng-template #signIn>
        <a class="icon-text" routerLink="/sign-in">
          <div class="box icon">🔑</div>
        </a>
      </ng-template>
    </section>
  `,
  styles: [
  ]
})
export class UserNavBarComponent {

  constructor(public authService :AuthService) { }
}
