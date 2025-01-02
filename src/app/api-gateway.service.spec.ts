import { TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiGatewayService } from './api-gateway.service';
import { Task } from './models/task.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('ApiGatewayService', () => {
  let service: ApiGatewayService;
  let httpMock: HttpTestingController;
  const API_URL = environment.api.serverUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ApiGatewayService,
          useFactory: (http: HttpClient) => new ApiGatewayService(http, false),
          deps: [HttpClient]
        }
      ]
    });
    service = TestBed.inject(ApiGatewayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Health Check', () => {
    const mockHealthStatus = {
      status: 'UP' as const,
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: 'UP' as const,
          responseTime: 50,
          lastChecked: new Date().toISOString()
        }
      },
      system: {
        uptime: 1000,
        memoryUsage: {
          total: 8000000000,
          free: 4000000000,
          used: 4000000000
        },
        cpuLoad: 1.5
      },
      version: '1.0.0'
    };

    it('should get API health status', async () => {
      const statusPromise = firstValueFrom(service.getAPIStatus());

      // Handle initial health check from constructor
      const initReq = httpMock.expectOne(`${API_URL}/api/health`);
      initReq.flush(mockHealthStatus);

      // Handle the actual test request
      const req = httpMock.expectOne(`${API_URL}/api/health`);
      expect(req.request.method).toBe('GET');
      req.flush(mockHealthStatus);

      const status = await statusPromise;
      expect(status).toEqual(mockHealthStatus);
    });

    it('should update status subject when health check runs', async () => {
      const statusPromise = firstValueFrom(service.getStatus$());

      // Handle initial health check from constructor
      const initReq = httpMock.expectOne(`${API_URL}/api/health`);
      initReq.flush(mockHealthStatus);

      service.getAPIStatus().subscribe();

      const req = httpMock.expectOne(`${API_URL}/api/health`);
      req.flush(mockHealthStatus);

      const status = await statusPromise;
      expect(status).toEqual(mockHealthStatus);
    });

    it('should perform periodic health checks', fakeAsync(() => {
      (service as any).startHealthCheck();
      service.getStatus$().subscribe();
      
      const firstReq = httpMock.expectOne(`${API_URL}/api/health`);
      firstReq.flush(mockHealthStatus);

      tick(30000);
      
      const secondReq = httpMock.expectOne(`${API_URL}/api/health`);
      secondReq.flush(mockHealthStatus);

      discardPeriodicTasks();
    }));
  });

  describe('Task Operations', () => {
    const mockTask: Task = {
      id: '1',
      userId: 'user1',
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: 'Medium',
      dueDate: new Date(),
      occurrence: 'daily'
    };

    it('should get user tasks', async () => {
      const userId = 'user1';
      const mockResponse = { success: true, tasks: [mockTask] };
      const tasksPromise = firstValueFrom(service.getUserTasks(userId));

      const req = httpMock.expectOne(`${API_URL}/tasks/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const tasks = await tasksPromise;
      expect(tasks).toEqual([mockTask]);
    });

    it('should create task', async () => {
      const newTask = {
        userId: 'user1',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        priority: 'Medium',
        dueDate: new Date(),
        occurrence: 'daily'
      };
      const mockResponse = { success: true, message: 'Created', task: mockTask };
      const taskPromise = firstValueFrom(service.createTask(newTask));

      const req = httpMock.expectOne(`${API_URL}/tasks`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newTask);
      req.flush(mockResponse);

      const task = await taskPromise;
      expect(task).toEqual(mockTask);
    });

    it('should update task', async () => {
      const updates = { completed: true };
      const mockResponse = { 
        success: true, 
        message: 'Updated', 
        task: { ...mockTask, ...updates }
      };
      const taskPromise = firstValueFrom(service.updateTask(mockTask.id, updates));

      const req = httpMock.expectOne(`${API_URL}/tasks/${mockTask.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updates);
      req.flush(mockResponse);

      const task = await taskPromise;
      expect(task.completed).toBe(true);
    });

    it('should delete task', async () => {
      const mockResponse = { success: true, message: 'Deleted' };
      const deletePromise = firstValueFrom(service.deleteTask(mockTask.id));

      const req = httpMock.expectOne(`${API_URL}/tasks/${mockTask.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);

      const success = await deletePromise;
      expect(success).toBe(true);
    });

    it('should throw error on failed API response', async () => {
      const mockErrorResponse = { success: false, message: 'Error occurred' };
      const taskPromise = firstValueFrom(service.getUserTasks('user1'));

      const req = httpMock.expectOne(`${API_URL}/tasks/user1`);
      req.flush(mockErrorResponse);

      await expectAsync(taskPromise).toBeRejectedWith(
        jasmine.objectContaining({ message: 'Error occurred' })
      );
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
