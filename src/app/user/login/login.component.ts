import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  username = '';
  password = '';
  badLogin = false;

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      (response: any) => {
        this.loginService.emitData(response.loggedin);
        this.router.navigate(['./property/manage']);
        this.badLogin = false;
        this.loginService.setOwner(response.data.username);
      },
      (err: any) => {
        this.badLogin = err.loggedin;
      }
    );
  }

  ngOnInit(): void {}
}
