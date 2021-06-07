import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RpgServiceService {
  constructor(private http: HttpClient) {}

  linkLogin: string = "http://moreiramoises.pt/server/apis/login.php";
  linkLogon = 'http://moreiramoises.pt/server/apis/signup.php';

  logIn(user, pass){
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
}
