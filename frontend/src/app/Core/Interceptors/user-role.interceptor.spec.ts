import { TestBed } from '@angular/core/testing';

import { UserRoleInterceptor } from './user-role.interceptor';

describe('UserRoleInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserRoleInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UserRoleInterceptor = TestBed.inject(UserRoleInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
