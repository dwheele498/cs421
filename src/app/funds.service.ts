import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FundsService {

  constructor(private http: HttpClient, private ls: LoginService) { }



  getFunds(username: string) {
    return this.http.get('http://127.0.0.1:5000/manage/checkfunds?username='+ username);
  }

  addFunds(money: number, un: string) {
    return this.http.post('http://127.0.0.1:5000/manage/addfunds', {
      funds: money,
      username: un
    });
  }
}
