import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RpgServiceService } from 'src/app/services/rpg-service.service';
import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-char-creator',
  templateUrl: './char-creator.component.html',
  styleUrls: ['./char-creator.component.css']
})
export class CharCreatorComponent implements OnInit {

  constructor(private rpgService: RpgServiceService, router: Router) {
    this.router = router;
  }

  router: Router;

  ngOnInit(): void { }

  // creates a character
  createChar(name, atk, int, lp, user, pass, input1: HTMLInputElement, input2: HTMLInputElement, input3: HTMLInputElement) {
    this.rpgService.createChar(name, atk, int, lp, user, pass).subscribe((x) => {
      if (x['code'] == 200) {
        this.router.navigate(['/Home']);

      } else {
        input1.classList.add('wrong');
        input2.classList.add('wrong');
        input3.classList.add('wrong');
      }
    });
  }

  removeWrong(input: HTMLInputElement) {
    input.classList.remove('wrong');
  }

  // limits the applyable skill points
  skillLimiter(atk: HTMLInputElement, int: HTMLInputElement, lp: HTMLInputElement, limit: HTMLElement) {
    let limiter: number = 30;

    limiter = limiter - parseInt(atk.value);
    limiter = limiter - parseInt(int.value);
    limiter = limiter - parseInt(lp.value);

    if (limiter == 0) {
      atk.max = atk.value;
      int.max = int.value;
      lp.max = lp.value;

      atk.value = atk.max;
      int.value = int.max;
      lp.value = lp.max;

    } else if (limiter < 0) {
      alert("Parece que passou o limite de skill points recebidos :(");

      atk.value = '10';
      int.value = '10';
      lp.value = '10';

      atk.max = '20';
      int.max = '20';
      lp.max = '20';

      limiter = 0;
      
    } else {
      atk.max = '20';
      int.max = '20';
      lp.max = '20';
    }

    limit.innerText = limiter.toString();
  }
}
