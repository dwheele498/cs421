import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  un = '';
  pw = '';
  badreg = false;

  constructor(private login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    this.login.register(this.un, this.pw).subscribe((res: any) => {
        console.log(res);
        this.router.navigate(['/user']);
      }
      , (err: any) => {
        console.log(err);
        this.badreg = true;
      }
    );
  }

}
