import { Component, OnInit, Input } from '@angular/core';
import { isUndefined } from 'util';
import { PropertyService } from 'src/app/property.service';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

 @Input() propert: any;
 name: string;
 price: number;
 owner: string;
 imgsrc: string;
 currentBid: number;
 desc: string;
 showDet = false;
 newBid = 0;
 id: string;

  constructor(private proper: PropertyService) {
  }

  ngOnInit(): void {

  this.id = this.propert.id;
  this.name = this.propert.name;
  this.imgsrc = this.propert.imgsrc;
  this.price = this.propert.price;
  this.owner = this.propert.owner;
  this.currentBid = this.propert.bid;
  this.desc = this.propert.description;
  console.log(this.propert);
  }

  showDetail(){
    this.showDet = !this.showDet;
  }

  setBid(bid: number){
    this.newBid = bid;
  }





}
