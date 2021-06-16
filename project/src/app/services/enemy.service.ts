import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnemyService {

  constructor() { }

  // enemy
  player: any = {
    name: "Macarena",
    id: "",
    atk: "",
    isMonset: "",
    int: "",
    lp: "",
    img: "",
    idPlayer: ""
  };
}
