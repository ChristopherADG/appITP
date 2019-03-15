import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckGetComponent } from './truck-get.component';

describe('TruckGetComponent', () => {
  let component: TruckGetComponent;
  let fixture: ComponentFixture<TruckGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
