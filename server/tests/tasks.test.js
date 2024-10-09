const request = require('supertest');
const app = require('../server.js');
const Task = require('../models/task-model.js');

describe('POST /tasks/new', () => {
    it('should return a 400 error when providing an empty body', async () => {
        const response = await request(app).post('/tasks/new').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Improper params supplied");
    });

    it('should return a 400 error when provided an incorrect amount of params', async () => {
       const task = new Task(
            "Test Description",
            "High",
            Date.now(),
            "Daily",
        );

        const response = await request(app).post('/tasks/new').send(task);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Improper params supplied");
    });

    it('should return a 200 code when provided the correct params', async () => {
       const task = new Task(
            "Test Description",
            "High",
            Date.now(),
            "Daily",
            1
        );
        
        const response = await request(app).post('/tasks/new').send(task);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Task created");
        expect(response.body).toHaveProperty("id");
    });
});

describe('POST /tasks', () => {
   it('should return a collection of tasks', async () => {
       const response = await request(app).get('/tasks');
       expect(response.status).toBe(200);
       expect(response.body.tasks).toBeDefined();
   });
});
