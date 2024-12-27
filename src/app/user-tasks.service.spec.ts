import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { UserTasksService } from './user-tasks.service';

describe('UserTasksService', () => {    
  let service: UserTasksService;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            UserTasksService,
            UserService
        ]
    });
    service = TestBed.inject(UserTasksService);
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should receive tasks for user and set them in local storage', () => {

  });

  it('should fallback to local storage if API is unavailable', () => {

  });

  it('should delete task from local storage and call API', () => {

  });

  it('should update task in local storage and call API', () => {

  });

  it('should create task in local storage and call API', () => {

  });
});
