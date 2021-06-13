import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RpgServiceService } from 'src/app/services/rpg-service.service';
import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {}

  

}
