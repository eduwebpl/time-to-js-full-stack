import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-nav-bar',
  template: `
    <section class="is-flex is-justify-content-end\t">
      <a class="icon-text" routerLink="/sign-in">
        <div class="box icon">🔑</div>
      </a>
    </section>
  `,
  styles: [
  ]
})
export class UserNavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
