import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let router: Router;

  let localStorageMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);

    localStorageMock = {
        getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
            if (key === 'user') {
                return JSON.stringify({ "id": "test-id" });
            }
            return null;
        }),
        setItem: jasmine.createSpy('setItem'),
        removeItem: jasmine.createSpy('removeItem'),
    };

    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a new user with proper credentials', () => {
    let results = service.register("test@test.email", "testpassword", "test", "testerson");
  });

  it('should authenticate the user', () => {
    
  });

  it('should log user out when requested', () => {

  });

});
