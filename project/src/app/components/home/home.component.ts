import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RpgServiceService } from 'src/app/services/rpg-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private rpgService: RpgServiceService, router: Router) {
    this.router = router;
  }

  router: Router;

  ngOnInit(): void { }

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
  logIn(user, pass, input1: HTMLInputElement, input2: HTMLInputElement) {
    this.rpgService.logIn(user, pass).subscribe((x) => {
      if (x['code'] == 200) {
        this.router.navigate(['/City']);
      } else {
        input1.classList.add('wrong');
        input2.classList.add('wrong');
      }
      console.log(x['data'])
    });
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

  removeWrong(user: HTMLInputElement, pass: HTMLInputElement) {
    user.classList.remove('wrong');
    pass.classList.remove('wrong');
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
