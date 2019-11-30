import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCityComponent } from './admin-city.component';

describe('AdminCityComponent', () => {
  let component: AdminCityComponent;
  let fixture: ComponentFixture<AdminCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
