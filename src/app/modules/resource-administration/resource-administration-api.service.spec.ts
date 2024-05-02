import { TestBed } from '@angular/core/testing';

import { ResourceAdministrationApiService } from './resource-administration-api.service';

describe('ResourceAdministrationApiService', () => {
  let service: ResourceAdministrationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceAdministrationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
