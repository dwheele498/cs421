import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidPropsComponent } from './bid-props.component';

describe('BidPropsComponent', () => {
  let component: BidPropsComponent;
  let fixture: ComponentFixture<BidPropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidPropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
