import { Component, OnInit, Output } from '@angular/core';
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

  login(){
    this.loginService.login('admin','admin');
    this.loginService.emitData(true);
    this.router.navigate(['./']);
  }

  ngOnInit(): void {}
}
