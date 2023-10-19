import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { nftCollectionResolver } from './nft-collection.resolver';

describe('nftCollectionResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => nftCollectionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
