import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProvidersComponent } from './get-providers.component';

describe('GetProvidersComponent', () => {
  let component: GetProvidersComponent;
  let fixture: ComponentFixture<GetProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
