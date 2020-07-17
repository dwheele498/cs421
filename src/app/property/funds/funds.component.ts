import { Component, OnInit, OnChanges } from '@angular/core';
import { FundsService } from 'src/app/funds.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit, OnChanges {
  money = 0;

  constructor(private fs: FundsService, private ls: LoginService) { }

  ngOnInit(): void {
    const user = this.ls.getOwner();
    this.fs.getFunds(user).subscribe((res: any) => {
      this.money = res.funds;
      console.log(this.money);
    });
  }

  ngOnChanges(): void{
    const user = this.ls.getOwner();
    this.fs.getFunds(user).subscribe((res: any) => {
      this.money = res.funds;
      console.log(this.money);
    });
  }


  addFunds() {
    this.fs.addFunds(this.money, 'admin').subscribe((res) => { console.log(res); })
  }

}
