import { TestBed } from '@angular/core/testing';

import { ProjectProposalService } from './project-proposal.service';

describe('ProjectProposalService', () => {
  let service: ProjectProposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectProposalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
