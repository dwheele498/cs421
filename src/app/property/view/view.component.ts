import { Component, OnInit, OnChanges } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { PropertyList } from '../propertyList';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { PropertyService } from 'src/app/property.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  proper: [];

  constructor(
    private router: Router,
    private login: LoginService,
    private propt: PropertyService
  ) {
    if (!this.login.getOwner()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.propt.getAllProperty().subscribe((resp: any) => {
      this.proper = resp.data;
      console.log(this.proper);
    });
  }
}
