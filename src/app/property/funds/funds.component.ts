import { Component, OnInit, OnChanges } from '@angular/core';
import { FundsService } from 'src/app/funds.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit, OnChanges {
  newMoney: number;
  currentMoney: number;
  success: boolean;

  constructor(private fs: FundsService, private ls: LoginService) { }

  ngOnInit(): void {
    const user = this.ls.getOwner();
    this.fs.getFunds(user).subscribe((res: any) => {
      this.currentMoney = res.funds;
      console.log(this.currentMoney);
    });
  }

  ngOnChanges(): void{
    const user = this.ls.getOwner();
    this.fs.getFunds(user).subscribe((res: any) => {
      this.currentMoney = res.funds;
      console.log(this.currentMoney);
    });
  }


  addFunds() {
    this.fs.addFunds(this.newMoney, 'admin').subscribe((res: any) => { this.success = res.result; });
  }

}
