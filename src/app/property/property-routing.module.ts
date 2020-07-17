import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ManageComponent } from './manage/manage.component';
import {AddPropsComponent} from './add-props/add-props.component';
import { BidPropsComponent } from './bid-props/bid-props.component';
import { FundsComponent } from './funds/funds.component';


const routes: Routes = [
    {
        path: 'view', component: ViewComponent
    },
    {
        path: 'manage', component: ManageComponent,
        children: [
            {path: '', component: AddPropsComponent},
            {path: 'bids', component: BidPropsComponent},
            {path: 'funds', component: FundsComponent}
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
