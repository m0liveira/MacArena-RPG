import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RpgServiceService {
  constructor(private http: HttpClient) { }

  linkLogin: string = "http://moreiramoises.pt/server/apis/login.php";
  linkLogon = 'http://moreiramoises.pt/server/apis/signup.php';
  linkCreateChar = 'http://moreiramoises.pt/server/apis/createChart.php';
  linkCharId = 'http://moreiramoises.pt/server/apis/get/getChar.php';
  linkRndChar = 'http://moreiramoises.pt/server/apis/get/getRandomChar.php?';

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

  // get a random character
  getRndChar() {
    return this.http.get(this.linkRndChar);
  }

}
