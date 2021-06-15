import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  playerID: any;

  password: any;
  username: any;

  player: any = {
    name: "login",
    id: "",
    atk: "0",
    isMonset: "",
    int: "0",
    lp: "0",
    img: "",
    idPlayer: "",
    weapon: ""
  };
}
