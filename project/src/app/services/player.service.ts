import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  // user id
  playerID: any;

  // user data
  password: any;
  username: any;

  // player
  player: any = {
    name: "login",
    id: "",
    atk: "0",
    isMonset: "",
    int: "0",
    lp: "0",
    img: "",
    idPlayer: "",
    weapon: "punch"
  };
}
