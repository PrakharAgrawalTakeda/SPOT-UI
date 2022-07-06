import { TestBed } from '@angular/core/testing';

import { ProjectHubService } from './project-hub.service';

describe('ProjectHubService', () => {
  let service: ProjectHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
