import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitGetComponent } from './categories-get.component';

describe('CategoriesGetComponent', () => {
  let component: CategoriesGetComponent;
  let fixture: ComponentFixture<UnitGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
