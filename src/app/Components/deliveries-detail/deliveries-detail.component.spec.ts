import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesDetailComponent } from './deliveries-detail.component';

describe('DeliveriesDetailComponent', () => {
  let component: DeliveriesDetailComponent;
  let fixture: ComponentFixture<DeliveriesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveriesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
