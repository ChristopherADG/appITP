import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolGetComponent } from './rol-get.component';

describe('RolGetComponent', () => {
  let component: RolGetComponent;
  let fixture: ComponentFixture<RolGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
