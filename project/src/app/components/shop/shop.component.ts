import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  chooseOneWeapon(
    sword: HTMLInputElement,
    burguer: HTMLInputElement,
    axe: HTMLInputElement
  ) {
    if (sword.checked) {
      burguer.checked = false;
      axe.checked = false;
    } else if (burguer.checked) {
      sword.checked = false;
      axe.checked = false;
    } else if (axe.checked) {
      burguer.checked = false;
      sword.checked = false;
    }
  }
}
