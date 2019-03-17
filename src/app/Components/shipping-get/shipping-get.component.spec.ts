import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingGetComponent } from './shipping-get.component';

describe('ShippingGetComponent', () => {
  let component: ShippingGetComponent;
  let fixture: ComponentFixture<ShippingGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
