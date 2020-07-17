import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/property.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-bid-props',
  templateUrl: './bid-props.component.html',
  styleUrls: ['./bid-props.component.css'],
})
export class BidPropsComponent implements OnInit {
  img: File;
  userprops = [];
  user: string;

  constructor(
    private property: PropertyService,
    private logger: LoginService
  ) {}

  ngOnInit(): void {
    this.user = this.logger.getOwner();
    this.property.getPropertyByOwner(this.user).subscribe((res: any) => {
      this.userprops = res.properties;
    });
  }
}
