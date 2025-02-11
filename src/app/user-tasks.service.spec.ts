import { TestBed } from '@angular/core/testing';
import { UserTasksService } from './user-tasks.service';
import { ApiGatewayService } from './api-gateway.service';
import { Task } from './models/task.model';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';

describe('UserTasksService', () => {
  let service: UserTasksService;
  let apiGatewayMock: jasmine.SpyObj<ApiGatewayService>;

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

  beforeEach(() => {
    apiGatewayMock = jasmine.createSpyObj('ApiGatewayService', [
      'getUserTasks',
      'createTask',
      'updateTask',
      'deleteTask'
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserTasksService,
        { provide: ApiGatewayService, useValue: apiGatewayMock }
      ]
    });
    service = TestBed.inject(UserTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadUserTasks', () => {
    it('should load tasks and update tasks subject', async () => {
      const mockTasks = [mockTask];
      apiGatewayMock.getUserTasks.and.returnValue(of(mockTasks));

      const tasks = await firstValueFrom(service.loadUserTasks('user1'));
      const currentTasks = await firstValueFrom(service.getTasks$());

      expect(tasks).toEqual(mockTasks);
      expect(currentTasks).toEqual(mockTasks);
      expect(apiGatewayMock.getUserTasks).toHaveBeenCalledWith('user1');
    });
  });

  describe('createTask', () => {
    it('should create task and add to tasks subject', async () => {
      apiGatewayMock.createTask.and.returnValue(of(mockTask));

      const newTask = await firstValueFrom(service.createTask('user1', {
        title: 'Test Task',
        description: 'Test Description',
        priority: 'Medium',
        dueDate: new Date(),
        occurrence: 'daily'
      }));
      const currentTasks = await firstValueFrom(service.getTasks$());

      expect(newTask).toEqual(mockTask);
      expect(currentTasks).toContain(mockTask);
      expect(apiGatewayMock.createTask).toHaveBeenCalledWith({
        userId: 'user1',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        priority: 'Medium',
        dueDate: jasmine.any(Date),
        occurrence: 'daily'
      });
    });
  });

  describe('updateTask', () => {
    it('should update task and update tasks subject', async () => {
      const updatedTask = { ...mockTask, completed: true };
      apiGatewayMock.updateTask.and.returnValue(of(updatedTask));

      // First load initial task
      apiGatewayMock.getUserTasks.and.returnValue(of([mockTask]));
      await firstValueFrom(service.loadUserTasks('user1'));

      const result = await firstValueFrom(service.updateTask('1', { completed: true }));
      const currentTasks = await firstValueFrom(service.getTasks$());

      expect(result).toEqual(updatedTask);
      expect(currentTasks[0].completed).toBe(true);
      expect(apiGatewayMock.updateTask).toHaveBeenCalledWith('1', { completed: true });
    });
  });

  describe('deleteTask', () => {
    it('should delete task and remove from tasks subject', async () => {
      apiGatewayMock.deleteTask.and.returnValue(of(true));

      // First load initial task
      apiGatewayMock.getUserTasks.and.returnValue(of([mockTask]));
      await firstValueFrom(service.loadUserTasks('user1'));

      const result = await firstValueFrom(service.deleteTask('1'));
      const currentTasks = await firstValueFrom(service.getTasks$());

      expect(result).toBe(true);
      expect(currentTasks.length).toBe(0);
      expect(apiGatewayMock.deleteTask).toHaveBeenCalledWith('1');
    });
  });

  describe('getTasks$', () => {
    it('should return the tasks observable', async () => {
      apiGatewayMock.getUserTasks.and.returnValue(of([mockTask]));
      await firstValueFrom(service.loadUserTasks('user1'));
      
      const tasks = await firstValueFrom(service.getTasks$());
      expect(tasks).toEqual([mockTask]);
    });
  });
});
