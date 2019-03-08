import { TestBed } from '@angular/core/testing';

import { DinningRoomService } from './dinning-room.service';

describe('DinningRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DinningRoomService = TestBed.get(DinningRoomService);
    expect(service).toBeTruthy();
  });
});
