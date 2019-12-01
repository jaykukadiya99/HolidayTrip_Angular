import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyinquiryComponent } from './myinquiry.component';

describe('MyinquiryComponent', () => {
  let component: MyinquiryComponent;
  let fixture: ComponentFixture<MyinquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyinquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyinquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
