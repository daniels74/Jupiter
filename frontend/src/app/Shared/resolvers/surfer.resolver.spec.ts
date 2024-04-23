import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { surferResolver } from './surfer.resolver';

describe('surferResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => surferResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
