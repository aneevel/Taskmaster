import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiGatewayService } from './api-gateway.service';
import { Task } from './models/task.model';
import { environment } from 'src/environments/environment';

describe('ApiGatewayService', () => {
  let service: ApiGatewayService;
  let httpMock: HttpTestingController;
  const API_URL = environment.api.serverUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiGatewayService]
    });
    service = TestBed.inject(ApiGatewayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Health Check', () => {
    it('should get API status', (done) => {
      const mockStatus = 200;

      service.getAPIStatus().subscribe(status => {
        expect(status).toBe(mockStatus);
        done();
      });

      const req = httpMock.expectOne(`${API_URL}/health`);
      expect(req.request.method).toBe('GET');
      req.flush(mockStatus);
    });

    it('should update status subject when health check runs', (done) => {
      const mockStatus = 200;

      service.getStatus$().subscribe(status => {
        expect(status).toBe(mockStatus);
        done();
      });

      service.getAPIStatus().subscribe();

      const req = httpMock.expectOne(`${API_URL}/health`);
      req.flush(mockStatus);
    });

    it('should perform periodic health checks', fakeAsync(() => {
      service.getStatus$().subscribe();
      
      // Initial check
      const firstReq = httpMock.expectOne(`${API_URL}/health`);
      firstReq.flush(200);

      // Fast forward 30 seconds
      tick(30000);
      
      // Should have made another request
      const secondReq = httpMock.expectOne(`${API_URL}/health`);
      secondReq.flush(200);
    }));
  });

  describe('Task Operations', () => {
    const mockTask: Task = {
      id: '1',
      userId: 'user1',
      title: 'Test Task',
      description: 'Test Description',
      completed: false
    };

    it('should get user tasks', (done) => {
      const userId = 'user1';
      const mockResponse = { success: true, tasks: [mockTask] };

      service.getUserTasks(userId).subscribe(tasks => {
        expect(tasks).toEqual([mockTask]);
        done();
      });

      const req = httpMock.expectOne(`${API_URL}/tasks/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should create task', (done) => {
      const newTask = {
        userId: 'user1',
        title: 'Test Task',
        description: 'Test Description',
        completed: false
      };
      const mockResponse = { success: true, message: 'Created', task: mockTask };

      service.createTask(newTask).subscribe(task => {
        expect(task).toEqual(mockTask);
        done();
      });

      const req = httpMock.expectOne(`${API_URL}/tasks`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newTask);
      req.flush(mockResponse);
    });

    it('should update task', (done) => {
      const updates = { completed: true };
      const mockResponse = { 
        success: true, 
        message: 'Updated', 
        task: { ...mockTask, ...updates }
      };

      service.updateTask(mockTask.id, updates).subscribe(task => {
        expect(task.completed).toBe(true);
        done();
      });

      const req = httpMock.expectOne(`${API_URL}/tasks/${mockTask.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updates);
      req.flush(mockResponse);
    });

    it('should delete task', (done) => {
      const mockResponse = { success: true, message: 'Deleted' };

      service.deleteTask(mockTask.id).subscribe(success => {
        expect(success).toBe(true);
        done();
      });

      const req = httpMock.expectOne(`${API_URL}/tasks/${mockTask.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });

    it('should throw error on failed API response', (done) => {
      const mockErrorResponse = { success: false, message: 'Error occurred' };

      service.getUserTasks('user1').subscribe({
        error: (error) => {
          expect(error.message).toBe('Error occurred');
          done();
        }
      });

      const req = httpMock.expectOne(`${API_URL}/tasks/user1`);
      req.flush(mockErrorResponse);
    });
  });

  describe('Cleanup', () => {
    it('should clear interval on destroy', () => {
      const clearIntervalSpy = spyOn(window, 'clearInterval');
      service.ngOnDestroy();
      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });
});
