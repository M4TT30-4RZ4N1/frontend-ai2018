/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResetGuardianService } from './resetGuardian.service';

describe('Service: ResetGuardian', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetGuardianService]
    });
  });

  it('should ...', inject([ResetGuardianService], (service: ResetGuardianService) => {
    expect(service).toBeTruthy();
  }));
});
