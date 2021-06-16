import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RpgServiceService } from 'src/app/services/rpg-service.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private rpgService: RpgServiceService,
    private playerService: PlayerService,
    router: Router
  ) {
    this.router = router;
  }



  ngOnInit(): void { }

  // variables
  router: Router;
  check: boolean = false;

  // remember me (not working for now)
  rememberMe(cbox: HTMLInputElement) {
    if (cbox.checked) {
      //guarda em coockies e guarda o check em coockies tambem.
    } else {
      // elimina os coockies
    }
  }

  // login
  logIn(user, pass, input1: HTMLInputElement, input2: HTMLInputElement) {
    this.rpgService.logIn(user, pass).subscribe((x) => {
      if (x['code'] == 200) {
        this.playerService.playerID = x['data'];
        this.playerService.username = input1.value;
        this.playerService.password = input2.value;

        this.router.navigate(['/City']);
      } else {
        input1.classList.add('wrong');
        input2.classList.add('wrong');
      }
    });
  }

  // sign up
  logOn(user, pass, input1: HTMLInputElement, input2: HTMLInputElement, passConfirm: HTMLInputElement
  ) {
    if (pass == passConfirm.value) {
      this.rpgService.logOn(user, pass).subscribe((x) => {
        if (x['code'] == 200) {
          this.router.navigate(['/CharCreator']);
        } else {
          input1.classList.add('wrong');
          input2.classList.add('wrong');
          passConfirm.classList.add('wrong');
        }
      });
    } else {
      passConfirm.classList.add('wrong');
      input2.classList.add('wrong');
    }
  }

  // remove wrong class
  removeWrong(input: HTMLInputElement) {
    input.classList.remove('wrong');
  }

  // starts game
  startGame(overlay: HTMLElement) {
    overlay.classList.remove('hide');
  }

  // does the check animation
  checkAnim(checkmark: HTMLElement) {
    if (!this.check) {
      checkmark.classList.add('checkAnim');
      checkmark.classList.remove('uncheckAnim');
      this.check = true;
    } else {
      checkmark.classList.remove('checkAnim');
      checkmark.classList.add('uncheckAnim');
      this.check = false;
    }
  }
}
