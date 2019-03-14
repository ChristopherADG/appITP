import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesGetComponent } from './categories-get.component';

describe('CategoriesGetComponent', () => {
  let component: CategoriesGetComponent;
  let fixture: ComponentFixture<CategoriesGetComponent>;

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
