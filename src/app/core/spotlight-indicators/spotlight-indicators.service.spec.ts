import { TestBed } from '@angular/core/testing';

import { SpotlightIndicatorsService } from './spotlight-indicators.service';

describe('SpotlightIndicatorsService', () => {
  let service: SpotlightIndicatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotlightIndicatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
