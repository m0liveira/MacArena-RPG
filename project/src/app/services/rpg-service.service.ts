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

  logIn(user, pass) {
    let dataToSend: FormData = new FormData();

    dataToSend.append("username", user);
    dataToSend.append("password", pass);

    return this.http.post(this.linkLogin, dataToSend);
  }

  logOn(user, pass) {
    let dataToSend: FormData = new FormData();

    dataToSend.append('username', user);
    dataToSend.append('password', pass);

    return this.http.post(this.linkLogon, dataToSend);
  }

  createChar(name, atk, int, vida, user, pass) {
    let dataToSend: FormData = new FormData();

    dataToSend.append('name', name);
    dataToSend.append('atk', atk);
    dataToSend.append('isMonster', '0');
    dataToSend.append('int', int);
    dataToSend.append('vida', vida);
    dataToSend.append('username', user);
    dataToSend.append('password', pass);

    return this.http.post(this.linkCreateChar, dataToSend);
  }
}
