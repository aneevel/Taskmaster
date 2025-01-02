import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';

import { UserService } from './user.service';
import { User } from './models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            UserService,
            { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
        ]
    });

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
  });

  it('should log user out and clear local storage', () => {
        
      localStorage.setItem('id_token', 'fake-token');
      localStorage.setItem('expires_at', JSON.stringify(DateTime.now().plus({ hours: 1 }).toISO()));
      
      service.logout();
   
      expect(localStorage.getItem('id_token')).toBeNull();
      expect(localStorage.getItem('expires_at')).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return true if user is logged in and not expired', () => {
    localStorage.setItem('expires_at', JSON.stringify(DateTime.now().plus({ hours: 1 }).toISO()));

    const result = service.isLoggedIn();

    expect(result).toBeTrue();
  });

  it('should return false if the user is expired', () => {
    localStorage.setItem('expires_at', JSON.stringify(DateTime.now().minus({ hours: 1}).toISO()));

    const result = service.isLoggedIn();
    expect(result).toBeFalse();
  });

  it('should change password when provided', () => {
      const response = { idToken: 'test-id', expiresIn: '3600' };

      service.changePassword('test@test.com', 'testpassword', 'newpassword').subscribe(response => {
            expect(response.idToken).toBe('test-id');
            expect(response.expiresIn).toBe('3600');
      });

      const req = httpMock.expectOne(`${service['API_URL']}/changePassword`);
      expect(req.request.method).toBe('PATCH');
      req.flush(response);
  });

  it('should store the expiry date in localStorage', () => {
    const expiry = DateTime.now().plus({ hours: 1 });

    service.setExpiry(expiry);

    const storedExpiry = localStorage.getItem('expires_at');
    expect(storedExpiry).toBeTruthy();
    expect(JSON.parse(storedExpiry!)).toBe(expiry.toISO());
  });

});
