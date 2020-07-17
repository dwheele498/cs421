import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FundsService {

  pathName = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient, private ls: LoginService) { }



  getFunds(username: string) {
    return this.http.get(this.pathName + '/manage/checkfunds?username='+ username);
  }

  addFunds(money: number, un: string) {
    return this.http.post(this.pathName + '/manage/addfunds', {
      funds: money,
      username: un
    });
  }
}
