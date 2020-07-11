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

  emitData(data) {
    this.observer.next(data);
  }

  login(un: string, pw: string) {
    let g = this.http.post('http://127.0.0.1:5000/login', {
      username: un,
      password: pw,
    });
    setTimeout(() => {
      this.http.post('http://127.0.0.1:5000/login', {
      username: un,
      password: pw,
    }).subscribe((res: any) => {

    }); } , 2000);
    return g;
  }

  register(un: string, pw: string) {
    return this.http.post('http://127.0.0.1:5000/register', {
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
