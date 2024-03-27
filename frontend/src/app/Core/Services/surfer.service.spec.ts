import { TestBed } from '@angular/core/testing';

import { SurferService } from './surfer.service';

describe('SurferService', () => {
  let service: SurferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
