/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegistrationGuardService } from './RegistrationGuard.service';

describe('Service: RegistrationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationGuardService]
    });
  });

  it('should ...', inject([RegistrationGuardService], (service: RegistrationGuardService) => {
    expect(service).toBeTruthy();
  }));
});
