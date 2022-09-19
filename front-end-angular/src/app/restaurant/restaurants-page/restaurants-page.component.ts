import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <section>
      <h3 class="is-size-3 my-3">Sea food restaurant</h3>
      <div class="box">sushi-street 23, 90023 Hutomaki</div>
      <article class="panel is-info"><p class="panel-heading">Delivery menu</p>
        <div class="panel-block"><label class="checkbox"><input type="checkbox"> Maki | 89.2zł</label></div>
        <div class="panel-block"><label class="checkbox"><input type="checkbox"> Philadelphia Roll |
          122zł</label></div>
        <div class="panel-block"><label class="checkbox"><input type="checkbox"> Volcano Roll |
          22.5zł</label></div>
      </article>
      <div class="box">
        <label>
          <span>Delivery address: </span>
          <textarea class="textarea"></textarea>
        </label>
      </div>
      <div class="is-flex is-justify-content-end">
        <button class="button is-link is-light" style="opacity: 0.5;">🛵 Order selected (0.00 zł)</button>
      </div>
    </section>
  `,
  styles: [
  ]
})
export class RestaurantsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
