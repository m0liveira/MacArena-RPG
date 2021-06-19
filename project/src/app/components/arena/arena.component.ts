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
  p1TotalHp: number;
  p2TotalHp: number;
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

        // total player hp
        this.p1TotalHp = parseInt(this.playerService.player.lp);
        this.p2TotalHp = parseInt(this.enemyService.player.lp);

        this.p1hp = this.p1TotalHp;
        this.p2hp = this.p2TotalHp;
      }
    });
  }

  loadPlayers() {
    let p1: any = document.getElementById("p1");
    let p2: any = document.getElementById("p2");

    p1.innerText = this.playerService.player.name;
    p2.innerText = this.enemyService.player.name;
  }

  // draws a random number
  getRndNum() {
    return Math.random() * (10 - 1) + 1;
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

  // calculates if the attack hits or misses
  hitMiss(didHit: number, player: PlayerService | EnemyService): number {
    let damage: number = parseInt(player.player.atk) + this.weaponDmg();

    if (didHit >= 4) {
      return Math.round(damage *= (didHit / 10));

    } else {
      return damage = 0;
    }
  }

  //calcutes the player hp percentage
  playerHpPercentage(currentHP: number, totalHP: number) {
    return currentHP <= 0 ? 0 : ((currentHP / 100) / (totalHP / 100)) * 100;
  }

  // reduces life if damaged
  gotDamaged(damage: number, hp): number {
    return hp -= damage;
  }

  goToCity() {
    this.router.navigate(['/City']);
  }

  // check if player is dead
  isDead(hp, player, dead, winModal): boolean {
    if (hp <= 0) {
      player.src = dead;

      setTimeout(() => {
        winModal.classList.remove("hide");
      }, 2000);

      return true;
    }

    return false;
  }

  p1WinnerPic(player, player2) {
    player.src = "../../../assets/media/rightAlive.png";
    player2.src = "../../../assets/media/leftDead.png";
  }

  p2WinnerPic(player, player2) {
    player.src = "../../../assets/media/rightDead.png";
    player2.src = "../../../assets/media/leftAlive.png";
  }

  battle(btn: HTMLElement, p1: HTMLElement, lp1: HTMLElement, P1: HTMLElement, p2: HTMLElement, lp2: HTMLElement, P2: HTMLElement,
    dmgInfo: HTMLElement, winModal: HTMLElement, winner: HTMLElement, ally: HTMLElement, enemy: HTMLElement) {
    // vars
    let dead1: string = "../../../assets/media/rightDead.png";
    let dead2: string = "../../../assets/media/leftDead.png";
    let isDead: boolean;

    //#region attack of the 1st player
    if (!isDead) {
      btn.classList.toggle("hide");

      // damage calculation
      let didHit: number = this.getRndNum();
      let damage: number = this.hitMiss(didHit, this.playerService);



      console.log("dano: ", damage);



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

      let player2HPAfterAttack = this.playerHpPercentage(this.p2hp, this.p2TotalHp);
      lp2.style.width = `${player2HPAfterAttack}%`;

      // check if player died
      isDead = this.isDead(this.p2hp, P2, dead2, winModal);

      // winning modal
      if (isDead) {
        winner.innerText = this.playerService.player.name + " Wins!";
        this.p1WinnerPic(ally, enemy);
      }
    }
    //#endregion

    //#region attack of the 2nd player
    if (!isDead) {
      setTimeout(() => {

        // damage calculation
        let didHit = this.getRndNum();
        let damage = this.hitMiss(didHit, this.enemyService);

        console.log("dano: ", damage);

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

        let player1HPAfterAttack = this.playerHpPercentage(this.p1hp, this.p1TotalHp);
        lp1.style.width = `${player1HPAfterAttack}%`;

        // check if player died
        isDead = this.isDead(this.p1hp, P1, dead1, winModal);

        if (!isDead) {
          setTimeout(() => {
            btn.classList.toggle("hide");
          }, 1250);
        }

        // winning modal
        if (isDead) {
          winner.innerText = this.enemyService.player.name + " Wins!";
          this.p2WinnerPic(ally, enemy);
        }
      }, 1500);
    }
    //#endregion
  }
}
