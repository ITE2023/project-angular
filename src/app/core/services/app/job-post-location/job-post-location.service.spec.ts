import { TestBed } from '@angular/core/testing';

import { JobPostLocationService } from './job-post-location.service';

describe('JobPostLocationService', () => {
  let service: JobPostLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobPostLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
