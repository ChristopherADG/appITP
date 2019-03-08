import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinningRoomGetComponent } from './dinning-room-get.component';

describe('DinningRoomGetComponent', () => {
  let component: DinningRoomGetComponent;
  let fixture: ComponentFixture<DinningRoomGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinningRoomGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinningRoomGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
