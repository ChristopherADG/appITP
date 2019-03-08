import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinningRoomUpdateComponent } from './dinning-room-update.component';

describe('DinningRoomUpdateComponent', () => {
  let component: DinningRoomUpdateComponent;
  let fixture: ComponentFixture<DinningRoomUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinningRoomUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinningRoomUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
