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

  ngOnInit(): void {
    this.loadPlayer();
    this.getChar();
  }

  // vars
  router: Router;

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

  goToShop() {
    this.router.navigate(['/Shop']);
  }

  goToArena() {
    this.router.navigate(['/Arena']);
  }

  goToWorkOut() {

  }

  logOut() {
    this.router.navigate(['/Home']);
  }

  hasOneDayPassed() {
    var date = new Date().toLocaleDateString();

    if (localStorage.yourapp_date == date) {
      return false;
    }

    localStorage.yourapp_date = date;
    return true;
  }

  runOncePerDay() {
    if (!this.hasOneDayPassed()) {
      alert('f u!');

      return false;
    }

    
  }
}
