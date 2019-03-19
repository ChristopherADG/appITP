import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesGetComponent } from './deliveries-get.component';

describe('DeliveriesGetComponent', () => {
  let component: DeliveriesGetComponent;
  let fixture: ComponentFixture<DeliveriesGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveriesGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
