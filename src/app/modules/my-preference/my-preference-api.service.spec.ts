import { TestBed } from '@angular/core/testing';

import { MyPreferenceApiService } from './my-preference-api.service';

describe('MyPreferenceApiService', () => {
  let service: MyPreferenceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPreferenceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
