import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderGetComponent } from './provider-get.component';

describe('ProviderGetComponent', () => {
  let component: ProviderGetComponent;
  let fixture: ComponentFixture<ProviderGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
