import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGetComponent } from './order-get.component';

describe('OrderGetComponent', () => {
  let component: OrderGetComponent;
  let fixture: ComponentFixture<OrderGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
