import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrderGetComponent } from './pending-order-get.component';

describe('PendingOrderGetComponent', () => {
  let component: PendingOrderGetComponent;
  let fixture: ComponentFixture<PendingOrderGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingOrderGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOrderGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
