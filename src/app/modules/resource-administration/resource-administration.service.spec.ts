import { TestBed } from '@angular/core/testing';

import { ResourceAdministrationService } from './resource-administration.service';

describe('ResourceAdministrationService', () => {
  let service: ResourceAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
