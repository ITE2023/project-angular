import { TestBed } from '@angular/core/testing';

import { RiskManagementService } from './risk-management.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RiskManagementService', () => {
  let service: RiskManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(RiskManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
