import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RpgServiceService } from 'src/app/services/rpg-service.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
  constructor(
    private rpgService: RpgServiceService,
    private playerService: PlayerService,
    router: Router
  ) {
    this.router = router;
  }

  // execute functions on loading
  ngOnInit(): void {
    this.loadPlayer();
    this.getChar();
  }

  // vars
  router: Router;

  // get player character
  getChar() {
    this.rpgService.getCharID(this.playerService.playerID).subscribe((x) => {
      if (x['code'] == 200) {
        this.playerService.player.name = x['data'].Personagens[0].Nome;
        this.playerService.player.id = x['data'].Personagens[0].ID;
        this.playerService.player.atk = x['data'].Personagens[0].Atk;
        this.playerService.player.isMonset = x['data'].Personagens[0].IsMonset;
        this.playerService.player.int = x['data'].Personagens[0].Int;
        this.playerService.player.lp = x['data'].Personagens[0].Vida;
        this.playerService.player.img = x['data'].Personagens[0].Imagem;
        this.playerService.player.idPlayer = x['data'].Personagens[0].ID_Player;

        this.loadPlayer();
      } else {
        this.router.navigate(['/City']);
      }
    });
  }

  // load the player character into the game
  loadPlayer() {
    let user = document.getElementById('user');
    let atk = document.getElementById('atk');
    let int = document.getElementById('int');
    let lp = document.getElementById('lp');

    user.innerText = this.playerService.player.name;
    atk.innerText = this.playerService.player.atk;
    int.innerText = this.playerService.player.int;
    lp.innerText = this.playerService.player.lp;
  }

  // checks if the day is higher then the previous date stored
  hasOneDayPassed() {
    var date = new Date().toLocaleDateString();

    if (localStorage.yourapp_date == date) {
      return false;
    }

    localStorage.yourapp_date = date;
    return true;
  }

  // just run once per day using function above
  runOncePerDay(gym: HTMLElement, modal: HTMLElement, p: HTMLElement, h1: HTMLElement) {
    if (!this.hasOneDayPassed()) {
      p.innerText = "Gym closed earlier!";
      h1.innerText = "Please comeback tomorrow!";
      p.style.color = "red";
      h1.style.color = "white";

      gym.classList.toggle("hide");
      modal.classList.toggle("hide");
      return false;
    }

    // stats upgrade
    this.rpgService.updateStats(parseInt(this.playerService.player.atk) + 1, parseInt(this.playerService.player.int) + 1, parseInt(this.playerService.player.lp) + 1).subscribe((x) => {
      console.log(x['code']);

      if (x['code'] == 200) {
        this.getChar();
        this.loadPlayer();
      }
    });

    // Modal stuff
    p.innerText = "You just got ripped!";
    h1.innerText = "Your stats increased by 1";
    p.style.color = "white";
    h1.style.color = "hsl(120, 82%, 46%)";

    // switch things
    gym.classList.toggle("hide");
    modal.classList.toggle("hide");
  }

  // go to the shop
  goToShop() {
    this.router.navigate(['/Shop']);
  }

  // go to the arena
  goToArena() {
    this.router.navigate(['/Arena']);
  }

  // go to the trainning
  goToWorkOut(gym: HTMLElement, modal: HTMLElement, overlay: HTMLElement) {
    modal.classList.toggle("hide");
    overlay.classList.toggle("hide");
    gym.classList.toggle("hide");
  }

  // log out of the player account
  logOut() {
    this.router.navigate(['/Home']);
  }

  // closes modal
  closeModal(overlay: HTMLElement) {
    overlay.classList.toggle("hide");
  }
}
