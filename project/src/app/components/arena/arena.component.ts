import { Component, OnInit } from '@angular/core';
import { RpgServiceService } from 'src/app/services/rpg-service.service';
import { PlayerService } from 'src/app/services/player.service';
import { EnemyService } from 'src/app/services/enemy.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {

  constructor(
    private rpgService: RpgServiceService,
    private playerService: PlayerService,
    private enemyService: EnemyService,
    router: Router
  ) {
    this.router = router;
  }

  ngOnInit(): void {
    this.getRndPlayer();
  }

  // vars
  router: Router;
  p1: string;
  p2: string;
  p1hp: number;
  p2hp: number;

  getRndPlayer() {
    this.rpgService.getRndChar().subscribe((x) => {
      if (x['code'] == 200) {
        this.enemyService.player.name = x['data'].Nome;
        this.enemyService.player.id = x['data'].ID;
        this.enemyService.player.atk = x['data'].Atk;
        this.enemyService.player.isMonset = x['data'].IsMonset;
        this.enemyService.player.int = x['data'].Int;
        this.enemyService.player.lp = x['data'].Vida;
        this.enemyService.player.img = x['data'].Imagem;
        this.enemyService.player.idPlayer = x['data'].ID_Player;

        this.loadPlayers();

        this.p1hp = parseInt(this.playerService.player.lp);
        this.p2hp = parseInt(this.enemyService.player.lp);
      }
    });
  }

  loadPlayers() {
    let p1: any = document.getElementById("p1");
    let p2: any = document.getElementById("p2");

    p1.innerText = this.playerService.player.name;
    p2.innerText = this.enemyService.player.name;
  }

  weaponDmg(): number {
    let damage: number;
    switch (this.playerService.player.weapon) {
      case "sword":
        return damage = 1;
        break;

      case "axe":
        return damage = 2;
        break;

      case "burguer":
        return damage = 3;
        break;

      case "punch":
        return damage = 0;
        break;

      default:
        break;
    }
  }

  // draws a random number
  getRndNum() {
    return Math.random() * (10 - 1) + 1;
  }

  // calculates if the attack hits or misses
  hitMiss(didHit: number, player: PlayerService | EnemyService): number {
    let damage: number = parseInt(player.player.atk) + this.weaponDmg();
    if (didHit >= 4) {
      return damage *= (didHit / 10);

    } else {
      return damage = 0;
    }
  }

  // reduces life if damaged
  gotDamaged(damage: number, hp): number {
    return hp -= damage;
  }

  // check if player is dead
  isDead(hp, player, dead) {
    if (hp <= 0) {
      // is dead end game

      player.src = dead;

      setTimeout(() => {
        this.router.navigate(['/City']);
      }, 1500);
    }
  }

  // calculate hp animation
  lifeAnimCalc(hp): number {
    return 100 - (hp * 10);
  }

  battle(btn: HTMLElement, p1: HTMLElement, lp1: HTMLElement, P1: HTMLElement, p2: HTMLElement, lp2: HTMLElement, P2: HTMLElement, dmgInfo: HTMLElement) {
    // vars
    let damage: number;
    let dead1: string = "../../../assets/media/rightDead.png";
    let dead2: string = "../../../assets/media/leftDead.png";

    btn.classList.toggle("hide2");

    //#region  attack of the 1st player

    // damage calculation
    let didHit: number = this.getRndNum();
    damage = this.hitMiss(didHit, this.playerService);

    // add / remove fight animation
    damage == 0 ? dmgInfo.innerText = "Missed: " + Math.round(damage) + " damage dealt!" : dmgInfo.innerText = "Hit: " + Math.round(damage) + " damage dealt!";
    dmgInfo.classList.toggle("hide2");
    p1.classList.add("attack");
    setTimeout(() => {
      p1.classList.remove("attack");
      dmgInfo.classList.toggle("hide2");
    }, 1000);

    // add loosing life animation and calculate hp
    this.p2hp = this.gotDamaged(damage, this.p2hp);
    lp2.style.transform = "translate(-" + this.lifeAnimCalc(this.p2hp) + "%)";

    // check if player died
    this.isDead(this.p2hp, P2, dead2);

    //#endregion

    //#region attack of the 2nd player
    setTimeout(() => {
      // damage calculation
      didHit = this.getRndNum();
      damage = this.hitMiss(didHit, this.enemyService);

      // add / remove fight animation
      damage == 0 ? dmgInfo.innerText = "Missed: " + Math.round(damage) + " damage dealt!" : dmgInfo.innerText = "Hit: " + Math.round(damage) + " damage dealt!";
      dmgInfo.classList.toggle("hide2");
      p2.classList.add("attack");
      setTimeout(() => {
        p2.classList.remove("attack");
        dmgInfo.classList.toggle("hide2");
      }, 1000);

      // add loosing life animation and calculate hp
      this.p1hp = this.gotDamaged(damage, this.p1hp);
      lp1.style.transform = "translateX(-" + this.lifeAnimCalc(this.p1hp) + "%)";

      // check if player died
      this.isDead(this.p1hp, P1, dead1);
    }, 1500);

    //#endregion

    setTimeout(() => {
      btn.classList.toggle("hide2");
    }, 2500);
  }
}
