import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RpgServiceService } from 'src/app/services/rpg-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private rpgService: RpgServiceService) {}

  ngOnInit(): void {}

  // variables
  check: boolean = false;

  rememberMe(cbox: HTMLInputElement) {
    if (cbox.checked) {
      //guarda em coockies e guarda o check em coockies tambem.
    } else {
      // elimina os coockies
    }
  }

  // login
  logIn(user, pass) {
    this.rpgService.logIn(user, pass).subscribe((x) => console.log(x['data']));
  }

  logOn(user, pass, passConfirm: HTMLInputElement) {
    if ((pass = passConfirm.value)) {
      this.rpgService
        .logOn(user, pass)
        .subscribe((x) => console.log(x['data']));
    } else {
      alert('As passwords não são iguais!');
    }
  }

  startGame(overlay: HTMLElement) {
    overlay.classList.remove('hide');
  }

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
