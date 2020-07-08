import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private login: LoginService) { }

  ngOnInit(): void {
  }

  register(un: string, pw: string){
    this.login.register(un, pw);
  }

}
