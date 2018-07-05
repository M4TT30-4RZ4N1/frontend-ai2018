/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CheckDuplicateUsernameService } from './checkDuplicateUsername.service';

describe('Service: CheckDuplicateUsername', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckDuplicateUsernameService]
    });
  });

  it('should ...', inject([CheckDuplicateUsernameService], (service: CheckDuplicateUsernameService) => {
    expect(service).toBeTruthy();
  }));
});
