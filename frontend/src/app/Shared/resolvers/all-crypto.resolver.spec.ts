import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { allCryptoResolver } from './all-crypto.resolver';

describe('allCryptoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => allCryptoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
