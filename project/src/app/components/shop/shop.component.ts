import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor(private playerService: PlayerService,
    router: Router
  ) {
    this.router = router;
  }

  ngOnInit(): void { }

  // vars
  router: Router;

  equipWeapon(sword: HTMLInputElement, burguer: HTMLInputElement, axe: HTMLInputElement) {
    if (sword.checked) {
      this.playerService.player.weapon = "sword";

    } else if (burguer.checked) {
      this.playerService.player.weapon = "burguer";

    } else if (axe.checked) {
      this.playerService.player.weapon = "axe";
    }
    console.log(this.playerService.player);
    this.router.navigate(['/City']);
  }

  chooseSword(burguer: HTMLInputElement, axe: HTMLInputElement) {
    burguer.checked = false;
    axe.checked = false;
  }

  chooseBurguer(sword: HTMLInputElement, axe: HTMLInputElement) {
    sword.checked = false;
    axe.checked = false;
  }

  chooseAxe(sword: HTMLInputElement, burguer: HTMLInputElement) {
    burguer.checked = false;
    sword.checked = false;
  }
}
