import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let router: Router;

  let localStorageMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            UserService,
            { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
        ]
    });

    localStorageMock = {
        getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
            if (key === 'user') {
                return JSON.stringify({ "idToken": "test-id" });
            }
            return null;
        }),
        setItem: jasmine.createSpy('setItem'),
        removeItem: jasmine.createSpy('removeItem'),
    };

    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
     httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register and set session', () => {
      const response = { idToken: 'test-id', expiresIn: '3600' };

      service.register('test@test.com', 'testpassword', 'First', 'Last').subscribe(response => {
            expect(response.idToken).toBe('test-id');
            expect(response.expiresIn).toBe('3600');
      });

      const req = httpMock.expectOne(`${service['API_URL']}/register`);
      expect(req.request.method).toBe('POST');
      req.flush(response);

      expect(localStorage.setItem).toHaveBeenCalledWith('id_token', 'test-id');
      expect(localStorage.setItem).toHaveBeenCalledWith('expires_at', jasmine.any(String));
  });

  it('should authenticate the user and set up session', () => {
    const response = { idToken: 'test-id', expiresIn: '3600' };

    service.login('test@test.com', 'testpassword').subscribe(response => {
        expect(response.idToken).toBe('test-id');
        expect(response.expiresIn).toBe('3600');
    });

    const req = httpMock.expectOne(`${service['API_URL']}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(response);

    expect(localStorage.setItem).toHaveBeenCalledWith('id_token', 'test-id');
    expect(localStorage.setItem).toHaveBeenCalledWith('expires_at', jasmine.any(String));
  });

  it('should log user out and clear local storage', () => {
    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('id_token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('expires_at');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return true if user is logged in', () => {
      service.login('test@test.com', 'testpassword');

      const expirationTime = moment().add(1, 'hour').valueOf();
      localStorage.setItem('expires_at', JSON.stringify(expirationTime));

      const result = service.isLoggedIn();
      expect(result).toBeTrue();
  });

  it('should return false if user is logged out', () => {
      const expirationTime = moment().subtract(1, 'hour').valueOf();
      localStorage.setItem('expires_at', JSON.stringify(expirationTime));

      const result = service.isLoggedIn();
      expect(result).toBeFalse();
  });

});
