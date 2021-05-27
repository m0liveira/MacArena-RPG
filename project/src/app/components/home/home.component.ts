import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // variables
  check: boolean = false;

  startGame(overlay: HTMLElement) {
    overlay.classList.remove("hide");
  }

  checkAnim(checkmark: HTMLElement) {
    if (!this.check) {
      checkmark.classList.add("checkAnim");
      checkmark.classList.remove("uncheckAnim");
      this.check = true;
    } else {
      checkmark.classList.remove("checkAnim");
      checkmark.classList.add("uncheckAnim");
      this.check = false;
    }
  }


}
