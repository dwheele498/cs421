import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage/manage.component';
import { PropertyComponent } from './property/property.component';
import { ViewComponent } from './view/view.component';
import { PropertyRoutingModule } from './property-routing.module';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { AddPropsComponent } from './add-props/add-props.component';
import { BidPropsComponent } from './bid-props/bid-props.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ManageComponent, PropertyComponent, ViewComponent, PropertyDetailComponent, AddPropsComponent, BidPropsComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    FormsModule
  ]
})
export class PropertyModule { }
