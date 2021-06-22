import { HttpClient } from '@angular/common/http';
import { PlayerService } from 'src/app/services/player.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RpgServiceService {
  constructor(private http: HttpClient, private playerService: PlayerService) { }

  // vars
  linkLogin: string = "http://moreiramoises.pt/server/apis/login.php";
  linkLogon: string = 'http://moreiramoises.pt/server/apis/signup.php';
  linkCreateChar: string = 'http://moreiramoises.pt/server/apis/createChart.php';
  linkCharId: string = 'http://moreiramoises.pt/server/apis/get/getChar.php?PlayerID=';
  linkRndChar: string = 'http://moreiramoises.pt/server/apis/get/getRandomChar.php?';
  linkUpdateChar: string = 'http://moreiramoises.pt/server/apis/updateChart.php';

  // log in to an account
  logIn(user, pass) {
    let dataToSend: FormData = new FormData();

    dataToSend.append("username", user);
    dataToSend.append("password", pass);

    return this.http.post(this.linkLogin, dataToSend);
  }

  // create an account
  logOn(user, pass) {
    let dataToSend: FormData = new FormData();

    dataToSend.append('username', user);
    dataToSend.append('password', pass);

    return this.http.post(this.linkLogon, dataToSend);
  }

  // create a character
  createChar(name, atk, int, vida, user, pass) {
    let dataToSend: FormData = new FormData();

    dataToSend.append('name', name);
    dataToSend.append('atk', atk);
    dataToSend.append('isMonster', 'false');
    dataToSend.append('int', int);
    dataToSend.append('vida', vida);
    dataToSend.append('username', user);
    dataToSend.append('password', pass);

    return this.http.post(this.linkCreateChar, dataToSend);
  }

  // get a character by account id
  getCharID(id) {
    return this.http.get(this.linkCharId + id);
  }

  // get a random character
  getRndChar() {
    return this.http.get(this.linkRndChar);
  }

  // update your character character
  updateStats(atk, int, vida) {
    let dataToSend: FormData = new FormData();

    dataToSend.append('idChar', this.playerService.player.id);
    dataToSend.append('name', this.playerService.player.name);
    dataToSend.append('atk', atk);
    dataToSend.append('isMonster', 'false');
    dataToSend.append('int', int);
    dataToSend.append('vida', vida);
    dataToSend.append('username', this.playerService.username);
    dataToSend.append('password', this.playerService.password);

    return this.http.post(this.linkUpdateChar, dataToSend);
  }
}
