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

  checkMoney() {
    const user = this.ls.getOwner();
    this.fs.getFunds(user).subscribe((res: any) => {
      this.currentMoney = res.funds;
      console.log(this.currentMoney);
    });
  }

  ngOnInit(): void {
    this.checkMoney();
  }

  ngOnChanges(): void {
    this.checkMoney();
  }


  addFunds() {
    this.fs.addFunds(this.newMoney, 'admin').subscribe((res: any) => { this.success = res.result; });
    this.currentMoney = Number(this.currentMoney) + Number(this.newMoney);
  }
}


