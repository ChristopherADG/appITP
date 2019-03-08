import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProvidersComponent } from './update-providers.component';

describe('UpdateProvidersComponent', () => {
  let component: UpdateProvidersComponent;
  let fixture: ComponentFixture<UpdateProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
