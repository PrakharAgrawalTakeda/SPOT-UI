import { TestBed } from '@angular/core/testing';

import { PortfolioCenterService } from './portfolio-center.service';

describe('PortfolioCenterService', () => {
  let service: PortfolioCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
