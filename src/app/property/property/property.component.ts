import { Component, OnInit, Input } from '@angular/core';
import { isUndefined } from 'util';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

 @Input() name: string;
 @Input() price: number;
 @Input() owner: string;
 @Input() imgSrc: string;
 @Input() currentBid: number;
 showDet = false;
  constructor() {
  }

  ngOnInit(): void {
    if (this.currentBid === undefined)
    {
      this.currentBid = 0;
    }
    console.log(this.currentBid);
  }

  showDetail(){
    this.showDet = !this.showDet;
  }

}
