import { Component, OnInit, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import {PropertyModel} from '../property.model';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter();
  bid = false;

  constructor(private ef: ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.ef.nativeElement);
  }
  ngOnDestroy(): void{
    document.body.removeChild(this.ef.nativeElement);
  }

  closeDetail(){
    this.close.emit();
  }

  openBid(){
    this.bid = !this.bid;
  }

}
