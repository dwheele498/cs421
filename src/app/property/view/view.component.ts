import { Component, OnInit } from '@angular/core';
import {PropertyComponent} from '../property/property.component';
import {PropertyList} from '../propertyList';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  proper = PropertyList;

  constructor() { }

  ngOnInit(): void {
  }

}
