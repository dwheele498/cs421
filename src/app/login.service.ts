import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private http: HttpClient) { }

  emitData(data)
  {
    this.observer.next(data);
  }

  login(un: string, pw: string){
    /* this.http.post('http://127.0.0.1:5000/login', {username: un, password: pw}).subscribe((response: any ) =>
    {
       console.log(response);
    }); */
    return this.http.post('http://127.0.0.1:5000/login', {username: un, password: pw});
  }

  register(un: string, pw: string){
    this.http.post('http://127.0.0.1:5000/register', {username: un, password: pw}).subscribe((response: any ) =>
    {
      console.log(response);
    });
  }
}
