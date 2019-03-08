import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinningRoomAddComponent } from './dinning-room-add.component';

describe('DinningRoomAddComponent', () => {
  let component: DinningRoomAddComponent;
  let fixture: ComponentFixture<DinningRoomAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinningRoomAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinningRoomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
