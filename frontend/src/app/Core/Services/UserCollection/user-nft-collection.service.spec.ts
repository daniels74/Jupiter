import { TestBed } from '@angular/core/testing';

import { UserNftCollectionService } from './user-nft-collection.service';

describe('UserNftCollectionService', () => {
  let service: UserNftCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNftCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
