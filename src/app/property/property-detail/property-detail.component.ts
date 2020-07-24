import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { PropertyService } from 'src/app/property.service';
import { BindingFlags } from '@angular/compiler/src/core';
import { LoginService } from 'src/app/login.service';
import { FundsService } from 'src/app/funds.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter();
  @Input() owner: string;
  @Input() id: string;
  @Input() price: number;
  @Input() currentBid: number;
  bid = false;
  bidAmount: number;
  currentUser: string;
  money: number;
  propSell: string;
  propStatus: string;


  constructor(
    private ef: ElementRef,
    private ps: PropertyService,
    private ls: LoginService,
    private fs: FundsService
  ) { }

  ngOnInit(): void {
    document.body.appendChild(this.ef.nativeElement);
    this.currentUser = this.ls.getOwner();
    this.fs.getFunds(this.currentUser).subscribe((res: any) => {
      this.money = res.funds;
    });
  }
  ngOnDestroy(): void {
    document.body.removeChild(this.ef.nativeElement);
  }

  closeDetail() {
    this.close.emit();
  }

  openBid() {
    this.bid = !this.bid;
  }

  sendBid() {
    if (this.bidAmount > this.price && this.bidAmount > this.currentBid) {
      if (this.money < this.bidAmount) {
        this.propStatus = 'Please add more funds before trying to make this bid';
        this.propSell = 'no';
        setTimeout(() => {
          this.propSell = '';
        }, 5000);
      }
      else {
        this.openBid();
        this.ps
          .submitBid(this.currentUser, this.bidAmount, this.id)
          .subscribe((res: any) => {
          });
        this.propStatus = 'Bid successfully added';
        this.propSell = 'yes';
        setTimeout(() => {
          this.propSell = '';
          this.closeDetail();
        }, 5000);
      }
    } else {
      this.propStatus = 'Bid must be greater than starting price or current bid';
      this.propSell = 'no';
      setTimeout(() => {
        this.propSell = '';
      }, 5000);
    }
  }

  endBid() {
    this.ps.sellProp(this.id, this.currentUser).subscribe((res: any) => {
      if (res.sale) {
        this.propStatus = res.status;
        this.propSell = 'yes';
        setTimeout(() => {
          this.propSell = '';
          this.closeDetail();
        }, 5000);
      }
      else {
        this.propStatus = res.status;
        this.propSell = 'no';
        setTimeout(() => {
          this.propSell = '';
        });
      }
    });

  }
}
