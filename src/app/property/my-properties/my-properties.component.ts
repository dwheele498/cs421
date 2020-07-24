import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { PropertyService } from 'src/app/property.service';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent implements OnInit {
  userprops = [];
  user: string;
  active = true;

  constructor(private ls: LoginService, private ps: PropertyService) {
    this.user = this.ls.getOwner();
    this.ps.getMyProps(this.user).subscribe((res: any) => {
      this.userprops = res.data;
      if (this.userprops.length > 0){
        this.active = true;
      }
      else {
        this.active = false;
      }
    });
   }

  ngOnInit(): void {
  }

}
