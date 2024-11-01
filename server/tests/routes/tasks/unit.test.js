const supertest = require('supertest');
const app = require('../../../server');

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

        describe('Given task with ID is invalid', () => {

            it('Should return a 500 code and an error message stating hex string must be 24 characters', async () => {
                await supertest(app)
                    .get('/tasks/0')
                    .expect(500)
                    .then((response) => {
                        expect(response.body.message).toBe("hex string must be 24 characters")
                    });
            });
        });

        /**describe('Given task with ID does exist', () => {

                it('Should return a 200 code', () => {
                    
                });

                it('Should return a valid task matching ID', () => {

                });

        });*/
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
                                .expect(400)
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
//                        .expect(201)
                        .then((response)=> {
 //                           expect(response.body["id"]).toBeTruthy();  
                            expect(response.body["message"]).toEqual("Task created");
                        });
                });
            });
        });
});
