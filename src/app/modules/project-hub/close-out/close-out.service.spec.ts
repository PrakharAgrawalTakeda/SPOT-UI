import { TestBed } from '@angular/core/testing';

import { CloseOutService } from './close-out.service';

describe('CloseOutService', () => {
  let service: CloseOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
