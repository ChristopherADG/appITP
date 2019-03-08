import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitGetComponent } from './unit-get.component';

describe('UnitGetComponent', () => {
  let component: UnitGetComponent;
  let fixture: ComponentFixture<UnitGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
