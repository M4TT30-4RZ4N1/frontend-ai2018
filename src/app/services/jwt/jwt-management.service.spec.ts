/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JwtManagementService } from './jwt-management.service';

describe('Service: JwtManagement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtManagementService]
    });
  });

  it('should ...', inject([JwtManagementService], (service: JwtManagementService) => {
    expect(service).toBeTruthy();
  }));
});
