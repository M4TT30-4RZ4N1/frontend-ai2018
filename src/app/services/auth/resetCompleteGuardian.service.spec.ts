/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResetCompleteGuardianService } from './resetCompleteGuardian.service';

describe('Service: ResetCompleteGuardian', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetCompleteGuardianService]
    });
  });

  it('should ...', inject([ResetCompleteGuardianService], (service: ResetCompleteGuardianService) => {
    expect(service).toBeTruthy();
  }));
});
