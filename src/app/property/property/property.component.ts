import { Component, OnInit, Input } from '@angular/core';
import { isUndefined } from 'util';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

 /* @Input() name: string;
 @Input() price: number;
 @Input() owner: string;
 @Input() imgsrc: string;
 @Input() currentBid: number;
 @Input() desc: string; */
 @Input() propert: any;
 name: string;
 price: number;
 owner: string;
 imgsrc: string;
 currentBid: number;
 desc: string;
 showDet = false;
  constructor() {
  }

  ngOnInit(): void {
  //   console.log(this.currentBid);
  //   console.log(this.imgsrc);
  // }
  this.name = this.propert.name;
  this.imgsrc = this.propert.imgsrc;
  this.price = this.propert.price;
  this.owner = this.propert.owner;
  this.currentBid = this.propert.bid;
  this.desc = this.propert.description;
  }

  showDetail(){
    this.showDet = !this.showDet;
  }

}
