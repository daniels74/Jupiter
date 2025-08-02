import { TestBed } from '@angular/core/testing';

import { SiteAdjustmentService } from './site-adjustment.service';

describe('SiteAdjustmentService', () => {
  let service: SiteAdjustmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteAdjustmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
