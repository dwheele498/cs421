import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropsComponent } from './add-props.component';

describe('AddPropsComponent', () => {
  let component: AddPropsComponent;
  let fixture: ComponentFixture<AddPropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
