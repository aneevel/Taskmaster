import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { UserTasksService } from './user-tasks.service';

describe('UserTasksService', () => {    
  let service: UserTasksService;
  let httpMock: HttpTestingController;
  let userService: UserService;

  let localStorageMock: any;

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

    localStorageMock = {
        getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
            if (key === 'user') {
                return JSON.stringify({ 'idToken': 'test-id' });
            } else if (key === 'tasks') {
                return JSON.stringify(
                    [
                        { '_id': '1', 
                        'description': 'A test description',
                        'priority': 'High',
                        'dueDate': '11-01-2025',
                        'occurrence': 'Daily',
                        'userID': 'test-id' 
                        }
                    ]
                );
            } else {
                return null;
            }
        }),
        setItem: jasmine.createSpy('setItem'),
        removeItem: jasmine.createSpy('removeItem'),
    };

    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);
  });

  afterEach(() => {
      httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should receive tasks for user and set them in local storage', () => {
    const response = { tasks: [] };

    service.getTasks('test-id').subscribe(response => {
        expect(response.tasks).toBeInstanceOf(Array);
    });

    const req = httpMock.expectOne(`${service['API_URL']}/tasks/test-id`);
    expect(req.request.method).toBe('GET');
    req.flush(response);

    //expect(localStorage.setItem).toHaveBeenCalledWith('tasks');
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
