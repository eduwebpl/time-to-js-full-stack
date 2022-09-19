import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <section>
      <div class="notification mt-5">Use menu on your left to order 🍲 with 🛵</div>
    </section>
  `,
  styles: [
  ]
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
