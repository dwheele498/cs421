import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private http: HttpClient) {}
  owner: string;
  pathName =  'http://127.0.0.1:5000';
  azure = 'https://cs421landgrab.azurewebsites.net';


  emitData(data) {
    this.observer.next(data);
  }

  login(un: string, pw: string) {
    return this.http.post(this.pathName + '/login', {
      username: un,
      password: pw,
    });
  }

  register(un: string, pw: string) {
    return this.http.post(this.pathName + '/register', {
      username: un,
      password: pw,
    });
  }

  getOwner(){
    return this.owner;
  }

  setOwner(owner: string){
    this.owner = owner;
  }
}
