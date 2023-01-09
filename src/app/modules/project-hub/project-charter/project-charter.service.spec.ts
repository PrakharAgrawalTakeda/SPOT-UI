import { TestBed } from '@angular/core/testing';

import { ProjectCharterService } from './project-charter.service';

describe('ProjectCharterService', () => {
  let service: ProjectCharterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCharterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
