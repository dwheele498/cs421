import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Binary } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  property: {};

  submitProperty(
    propertyName: string,
    startingPrice: number,
    newOwner: string,
    descr: string,
    imagesrc: string
  ) {
    return this.http.post('http://127.0.0.1:5000/property/new', {
      name: propertyName,
      price: startingPrice,
      owner: newOwner,
      description: descr,
      imgsrc: imagesrc,
    });
  }

  submitImg(
    imgsrc: FormData,
    hheaders: HttpHeaders,
  ) {
    return this.http.post(
      'http://127.0.0.1:5000/property/new/img',
      imgsrc,
      { headers: hheaders }
    );
  }

  getPropertyByOwner(owner: string, name: string) {
    return this.http.get(
      'http://127.0.0.1:5000/property/view?owner=' + owner + '&name=' + name
    );
  }

  getAllProperty(){
    return this.http.get('http://127.0.0.1:5000/property/all');
  }
}
