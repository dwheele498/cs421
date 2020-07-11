import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/property.service';

@Component({
  selector: 'app-bid-props',
  templateUrl: './bid-props.component.html',
  styleUrls: ['./bid-props.component.css']
})
export class BidPropsComponent implements OnInit {

  img: File;

  constructor(private property: PropertyService) { }

  ngOnInit(): void {
    this.property.getPropertyByOwner('admin','TEST').subscribe((res:any)=>{
      this.img = res.image;
    })
  }

}
