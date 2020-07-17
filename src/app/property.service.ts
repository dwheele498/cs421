import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Binary } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  property: {};
  pathName = 'https://dwheel7.pythonanywhere.com';

  submitProperty(
    propertyName: string,
    startingPrice: number,
    newOwner: string,
    descr: string,
    imagesrc: string
  ) {
    return this.http.post(this.pathName + '/property/new', {
      name: propertyName,
      price: startingPrice,
      owner: newOwner,
      description: descr,
      imgsrc: imagesrc,
    });
  }

  submitImg(imgsrc: FormData, hheaders: HttpHeaders) {
    return this.http.post(this.pathName + '/property/new/img', imgsrc, {
      headers: hheaders,
    });
  }

  getPropertyByOwner(owner: string) {
    return this.http.get(this.pathName + '/property/view?owner=' + owner);
  }

  getAllProperty() {
    return this.http.get( this.pathName + '/property/all');
  }

  submitBid(owner: string, bidAmount: number, id: string) {
    console.log(bidAmount);
    return this.http.post(this.pathName + '/bid/add', {
      username: owner,
      bid: bidAmount,
      _id: id,
    });
  }

  userBids(owner: string) {
    return this.http.get('http://127.0.0.1:5000/bids/user?username=' + owner);
  }

  sellProp(propid: string, user: string){
    console.log(user);
    this.http.post('http://127.0.0.1:5000/bid/sell', {
      id: propid,
      username: user

    }).subscribe((res)=>{
      console.log(res);
    });
  }
}
