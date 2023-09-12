import { TestBed } from '@angular/core/testing';

import { RoleManagementService } from './role-management.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoleManagementService', () => {
  let service: RoleManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(RoleManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
