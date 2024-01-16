import { TestBed } from '@angular/core/testing';

import { CreateNewApiService } from './create-new-api.service';

describe('CreateNewApiService', () => {
  let service: CreateNewApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  }); 
});
