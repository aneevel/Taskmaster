import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user', () => {
    service.authenticate('test', 'pass');
    expect(service.isAuthenticated.toBeTruthy());
  });

    it('should unauthenticate user', () => {
      service.authenticate('test', 'pass');
      service.unauthenticate();
      expect(service.isAuthenticated.toBeFalsy());
    });

    it ('should retrieve username', () => {
        service.authenticate('test', 'pass');
        expect(service.getUsername().toEqual('test'));
    });

    it('should retrieve user tasks', () => {
        service.authenticateAs('test', 'pass');
        expect(service.getTasks().toBeNonNull());
    });

    it('should change user password', () => {
        service.changePassword('test', 'newPass');
        service.getUserPass('test').toEqual('newPass');
    });
});
