import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LandGrab';
  loggedIn = false;

  constructor(private loginService: LoginService){}

  logout()
  {
    this.loggedIn = false;
  }

  ngOnInit()
  {
    this.loginService.subscriber$.subscribe(data => {
      this.loggedIn = Boolean(data);
    });
  }
}
