const supertest = require('supertest');
const app = require('../../../server');
const mongodb = require('mongodb')

const Task = require('../../../models/task-model');

jest.mock('../../../middleware/validate-jwt', () => jest.fn((req, res, next) => {
    return next(null);
}));

describe('Tasks', () => {
    
    describe('GET All Tasks', () => {
        
        it('Should a return a 200 code and a collection of valid tasks', async () => {

            await supertest(app)
                .get('/tasks') 
                .expect(200)
                .then((response) => {
                    expect(Array.isArray(response.body)).toBeTruthy();
                });
        });

    });

    describe('GET Task with ID', () => {

        describe('Given task with user ID is invalid', () => {

            it('Should return a 500 code and an error message stating hex string must be 24 characters', async () => {
                await supertest(app)
                    .get('/tasks/0')
                    .expect(500)
                    .then((response) => {
                        expect(response.body.message).toBe("hex string must be 24 characters")
                    });
            });
        });

        describe('Given task with a non-existent user ID', () => {

            it('Should return a 404 code and an error message stating no user with ID was found', async () => {
                await supertest(app)
                    .get('/tasks/000000000000000000000000')
                    .expect(404)
                    .then((response) => {
                        expect(response.body.message).toBe("No tasks associated with user ID");
                    });
            });
        });

        describe('Given task with user ID does exist', () => {

                it('Should return a 200 code and a valid set of tasks', async () => {
                    await supertest(app)
                        .get('/tasks/66a2c3b69d5dbcf506d743bb')
                        .expect(200)
                        .then((response) => {
                            expect(Array.isArray(response.body)).toBeTruthy()
                        });
                });
        });
    });
describe('POST Create New Task', () => {
        
            describe('Given request does not provide a body of params', () => {

                it('Should return a 400 code and an error message stating request provided improper params', async () => {
                    await supertest(app)
                        .post('/tasks/new')
                        .send({})
                        .expect(400)
                        .then((response)=> {
                            expect(response.body["message"]).toEqual("Improper params supplied");
                        });
                });
            });
            
            describe('Given request does not provide the proper number of params', () => {
                
                it('Should return a 400 code and an error message stating requested provided improper params', async () => {
                    await supertest(app)
                        .post('/tasks/new')
                        .send({
                            "foo": "bar",
                            "bar": "foo"
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body["message"]).toEqual("Improper params supplied");
                        });

                });
            });

            describe('Given request does not provide valid params', () => {
                
                describe('Given request has malformed description', () => {
                   
                    describe('Given request has empty description', () => {
                        
                        it('Should return a 400 code and an error message stating tasks must have a non-empty description', async () => {
                            
                            await supertest(app)
                                .post('/tasks/new')
                            .send({
                                "description": "",
                                "priority": "1",
                                "dueDate": Date.now() + 1,
                                "occurrence": "Daily",
                                "userID": '66a2c3b69d5dbcf506d743bb' 
                             })
                            .expect(400)
                            .then((response) => {
                                expect(response.body["message"]).toEqual("Tasks must have a non-empty description");
                            });

                        });
                    });

                    describe('Given request has a description exceeding maximum length', () => {

                        it('Should return a 400 code and an error message stating description should not exceed 100 characters', async () => {

                            await supertest(app)
                                .post('/tasks/new')
                                .send({
                                    "description": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                    "priority": "1",
                                    "dueDate": Date.now() + 1,
                                    "occurrence": "Daily",
                                    "userID": '66a2c3b69d5dbcf506d743bb' 
                                })
                                .expect(400)
                                .then((response) => {
                                    expect(response.body["message"]).toEqual("Task descriptions must not exceed 100 characters");
                                });

                        });
                    });
                });

                describe('Given request has a malformed priority', () => {
                    
                    describe('Given request has empty priority', () => {

                        it('Should return a 400 code and an error message stating tasks must have a non-empty priority', async () => {
                            await supertest(app)
                                .post('/tasks/new')
                                .send({
                                    "description": "test",
                                    "priority": "",
                                    "dueDate": Date.now() + 1,
                                    "occurrence": "Daily",
                                    "userID": '66a2c3b69d5dbcf506d743bb' 
                                })
                                .expect(400)
                                .then((response) => {
                                    expect(response.body["message"]).toEqual("Tasks must have a non-empty priority");
                                });
                        });
                    });

                    describe('Given request has a priority of non-existent type', () => {
                        
                        it('Should return a 400 code and an error message stating task priority must be 1, 2, or 3', async () => {
                            await supertest(app)
                                .post('/tasks/new')
                                .send({
                                    "description": "test",
                                    "priority": "4",
                                    "dueDate": Date.now() + 1,
                                    "occurrence": "Daily",
                                    "userID": '66a2c3b69d5dbcf506d743bb' 
                                })
                                .expect(400)
                                .then((response) => {
                                    expect(response.body["message"]).toEqual("Tasks must have a priority of 1, 2, or 3");
                                });

                        });
                    });
                });

                describe('Given request has a malformed due date', () => {

                    describe('Given request has an empty date', () => {

                        it('Should return a 400 code and an error message stating tasks must have a due date', async () => {
                            await supertest(app)
                                .post('/tasks/new')
                                .send({
                                    "description": "test",
                                    "priority": "1",
                                    "dueDate": "",
                                    "occurrence": "Daily",
                                    "userID": '66a2c3b69d5dbcf506d743bb' 
                                })
                                .expect(400)
                                .then((response) => {
                                    expect(response.body["message"]).toEqual("Tasks must have a non-empty due date");
                                });
                        });
                    });

                    describe('Given request has an incorrectly formed date', () => {

                        it('Should return a 400 code and an error message stating tasks must have a properly formed due date', async () => {
                           await supertest(app)
                                .post('/tasks/new')
                                .send({
                                    "description": "test",
                                    "priority": "1",
                                    "dueDate": new Date("nothing"),
                                    "occurrence": "Daily",
                                    "userID": '66a2c3b69d5dbcf506d743bb' 
                                })
                                .expect(400)
                                .then((response) => {
                                    expect(response.body["message"]).toEqual("Improper params supplied");
                                });
                          });

                    });

                    describe('Given request has a date that has already passed', () => {

                        it('Should return a 400 code and an error message stating tasks must have a due date that has not occurred yet', async () => {
                           await supertest(app)
                                .post('/tasks/new')
                                .send({
                                    "description": "test",
                                    "priority": "1",
                                    "dueDate": Date.now() - 1,
                                    "occurrence": "Daily",
                                    "userID": '66a2c3b69d5dbcf506d743bb' 
                                })
                                .expect(400)
                                .then((response) => {
                                    expect(response.body["message"]).toEqual("Tasks must have a due date that has not already occurred");
                                });
                          });
                        });
                    });

                describe('Given request has a malformed occurrence', () => {
                
                    describe('Given request has an empty occurrence', () => {
                    
                        it('Should return a 400 code and an error message stating tasks must have a non-empty occurrence', async () => {
                             await supertest(app)
                                .post('/tasks/new')
                                .send({
                                    "description": "test",
                                    "priority": "1",
                                    "dueDate": Date.now() + 1,
                                    "occurrence": "",
                                    "userID": '66a2c3b69d5dbcf506d743bb' 
                                })
                                .expect(400)
                                .then((response) => {
                                    expect(response.body["message"]).toEqual("Tasks must have a non-empty occurrence");
                                });
                           
                        });
                    });

                    describe('Given request has a non-matching occurrence type', () => {
                        
                        it('Should return a 400 code and an error message stating tasks must have an occurrence of Daily, Weekly, Monthly, or Once', async () => {
                            await supertest(app)
                                .post('/tasks/new')
                                .send({
                                    "description": "test",
                                    "priority": "1",
                                    "dueDate": Date.now() + 1,
                                    "occurrence": "Never",
                                    "userID": '66a2c3b69d5dbcf506d743bb' 
                                })
                                .expect(400)
                                .then((response) => {
                                    expect(response.body["message"]).toEqual("Tasks must have an occurrence of Daily, Weekly, Monthly, or Once");
                                });
                           
                        });
                    });
                });

                describe('Given request has an userID that does not match any user', () => {
                    
                    it('Should return a 404 code and an error message stating that no user with userID exists', async () => {
                            await supertest(app)
                                .post('/tasks/new')
                                .send({
                                    "description": "test",
                                    "priority": "1",
                                    "dueDate": Date.now() + 1,
                                    "occurrence": "Daily",
                                    "userID": 1 
                                })
                                .expect(404)
                                .then((response) => {
                                    expect(response.body["message"]).toEqual("User with userID does not exist");
                                });
                    
                    });
                });
            });

            describe('Given request is a valid Task', () => {
                
                it('Should return a 201 code and a valid Task object', async () => {

                    await supertest(app)
                        .post('/tasks/new')
                        .send({
                            "description": "Test",
                            "priority": "1",
                            "dueDate": Date.now() + 1,
                            "occurrence": "Daily",
                            "userID": "66a2c3b69d5dbcf506d743bb"
                        })
                        .expect(201)
                        .then((response)=> {
                            expect(response.body["id"]).toBeTruthy();  
                            expect(response.body["message"]).toEqual("Task created");
                        });
                });
            });
        });

    describe('PATCH Tasks', () => {

        describe('Given sent data is invalid in some manner', () => {
           
            describe('Given non existent task ID was given', () => {
                
                it('Should return a 404 code and an error message stating no task with ID was found', async () => {
                    await supertest(app)
                        .patch('/tasks/000000000000000000000000')
                        .send({
                            "description": "Test"
                        })
                        .expect(404)
                        .then((response) => {
                            expect(response.body["message"]).toEqual("No task with ID was found");
                        });
                })
            });

            describe('Given description exceeds 100 characters', () => {
                
                it('Should return a 400 code and an error message stating description should not exceed 100 characters', async () => {
                    
                    await supertest(app)
                        .patch('/tasks/672aea2f7fefc75284d45931')
                        .send({
                            "description": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        })
                        .expect(400)
                        .then((response) => { 
                            expect(response.body["message"]).toEqual("Task description must not exceed 100 characters");
                        });
                });
            });

            describe('Given priority is not one of 1, 2, or 3', () => {
                
                it('Should return a 400 code and an error message stating priority must be one of 1, 2, or 3', async () => {
                    await supertest(app)
                        .patch('/tasks/672aea2f7fefc75284d45931')
                        .send({
                            "priority": "4"
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body["message"]).toEqual('Tasks must have a priority of 1, 2, or 3');
                        });
                });
            });

            describe('Given due date has already passed', () => {

                it('Should return a 400 code and an error message stating due date must not preceed current date', async () => {
                    await supertest(app)
                        .patch('/tasks/672aea2f7fefc75284d45931')
                        .send({
                            "dueDate": Date.now() - 1 
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body["message"]).toEqual('Due date must not preceed current date');
                        });
                });
            });

            describe('Given occurrence is not one of Daily, Weekly, Monthly, or Once', () => {

                it('Should return a 400 code and an error message stating that occurrence must be one of Daily, Weekly, Monthly, or Once', async () => {
                    await supertest(app)
                        .patch('/tasks/672aea2f7fefc75284d45931')
                        .send({
                            "occurrence": "Never"
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body["message"]).toEqual("Occurrence must be one of Daily, Weekly, Monthly, or Once");
                        });
                });
            });
        });

        describe('Given sent data is valid', () => {

            describe('Given empty body is provided', () => {

                it('Should return a 204 status', async () => {
                    await supertest(app)
                        .patch('/tasks/672aea2f7fefc75284d45931')
                        .expect(204)
                        .send();
                });
            });
        });

    });
});
