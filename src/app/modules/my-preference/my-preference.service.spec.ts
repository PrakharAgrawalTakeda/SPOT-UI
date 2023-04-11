import { TestBed } from '@angular/core/testing';

import { MyPreferenceService } from './my-preference.service';

describe('MyPreferenceService', () => {
  let service: MyPreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
