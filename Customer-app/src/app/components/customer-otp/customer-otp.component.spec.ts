import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOtpComponent } from './customer-otp.component';

describe('CustomerOtpComponent', () => {
  let component: CustomerOtpComponent;
  let fixture: ComponentFixture<CustomerOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
