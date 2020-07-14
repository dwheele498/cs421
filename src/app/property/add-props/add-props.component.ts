import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { PropertyService } from 'src/app/property.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-props',
  templateUrl: './add-props.component.html',
  styleUrls: ['./add-props.component.css'],
})
export class AddPropsComponent implements OnInit {
  @ViewChild('imgsrc') imgsrc: ElementRef;
  file: File;
  name = '';
  owner: string;
  price: number;
  desc = '';
  imgPath = '';
  success: boolean;
  formData = new FormData();

  constructor(
    private login: LoginService,
    private proper: PropertyService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.owner = this.login.getOwner();
  }


  makeProp() {
    // const formData = new FormData();
    // formData.append('imgsrc', this.file);
    // console.log(formData);
    this.proper
      .submitProperty(this.name, this.price, this.owner, this.desc, this.imgPath)
      .subscribe(
        (res: any) => {
          console.log(res.message);
        },
        (err: any) => {
          console.log(err);
          this.success = false;
        }
      );
  }

  sendImg() {
    this.formData.append(
      'file',
      this.imgsrc.nativeElement.files[0],
      this.imgsrc.nativeElement.files[0].name
    );
    const hheaders = new HttpHeaders();
    hheaders.append('Content-Type', 'multipart/form-data');
    hheaders.append('Accept', 'application/json');
    const imgsrc = this.formData;
    // this.http.post('http://127.0.0.1:5000/property/new/img', imgsrc,{
    //   headers: hheaders
    // }).subscribe(
    this.proper.submitImg(imgsrc, hheaders).subscribe(
      (res: any) => {
        console.log(res);
        this.imgPath = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
