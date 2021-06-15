import { Component, OnInit } from '@angular/core';
import { RpgServiceService } from 'src/app/services/rpg-service.service';
import { PlayerService } from 'src/app/services/player.service';
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
    router: Router
  ) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  // vars
  router: Router;

}
