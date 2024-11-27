const supertest = require('supertest');
const app = require('../../../server');

const existingUserID = '66a2c3b69d5dbcf506d743bb';
const modifyUserID = '66a2c3b69d5dbcf506d743bb';
const nonexistingUserID = '000000000000000000000000';
const invalidUserID = '0';

jest.mock('../../../middleware/validate-jwt', () => jest.fn((req, res, next) => {
    return next(null);
}));

beforeEach(async () => {

    // Cleans up before we do any adding
   await supertest(app)
        .delete(`/users/${nonexistingUserID}`);
});

describe('Users', () => {

    describe('GET ALL Users', () => {
        
        it('Should return a 200 code and a collection of valid users', async () => {
            
            await supertest(app)
                .get('/users')
                .expect(200)
                .then((response) => {
                    expect(Array.isArray(response.body)).toBeTruthy();
                });
        });
    });

    describe('GET User with ID', () => {

        describe('Given ID matches a valid and existing user ID', () => {
            
            it ('Should return a 200 code and an user object', async () => {
                
                await supertest(app)
                    .get(`/users/${existingUserID}`)
                    .expect(200)
                    .then((response) => {
                        expect(response.body).toHaveProperty('email');
                        expect(response.body).toHaveProperty('lname');
                        expect(response.body).toHaveProperty('fname');
                        expect(response.body).toHaveProperty('confirmed');
                        expect(response.body).toHaveProperty('admin');
                    });
            });
        });

        describe('Given ID is valid, but does not match any user', () => {
            
            it('Should return a 404 error and an error message stating no user with ID exists', async () => {
                
                await supertest(app)
                    .get(`/users/${nonexistingUserID}`)
                    .expect(404)
                    .then((response) => {
                        expect(response.body.message).toBe("No user with ID exists");
                    });
            });
        });

        describe('Given ID is invalid', () => {
            
            it('Should return a 500 error and an error message stating hex string must be 24 characters', async () => {
                
                await supertest(app)
                    .get(`/users/${invalidUserID}`)
                    .expect(500)
                    .then((response) => {
                        expect(response.body.message).toBe("hex string must be 24 characters");
                    });
            });
        });
    });

    describe('POST User', () => {
        
        describe('Given invalid parameters', () => {
            
            describe('Given no parameters were provided', () => {

                it('Should return a 400 error and an error message stating no parameters were provided', async () => {
                    
                    await supertest(app)
                        .post(`/users/new`)
                        .send({})
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("Invalid params supplied");
                        });
                });
            });

            describe('Given no email was provided', () => {
                
                it('Should return a 400 error and an error message stating a valid, non-existing email must be provided', async () => {
                    
                    await supertest(app)
                        .post(`/users/new`)
                        .send({
                            "email": "",
                            "password": "testpassword",
                            "lname" : "McTest",
                            "fname" : "Davey"
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("A valid, non-existing email must be provided");
                        });
                });
            });

            describe('Given an invalid email was provided', () => {
                
                it('Should return a 400 error and an error message stating a valid, non-existing email must be provided', async () => {
                    
                    await supertest(app)
                        .post(`/users/new`)
                        .send({
                            "email": "test",
                            "password": "testpassword",
                            "lname" : "McTest",
                            "fname" : "Davey"
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("A valid, non-existing email must be provided");
                        });
                });
            });

            describe('Given an email that already exists for an user', () => {

                it('Should return a 400 error and an error message stating user with email exists already', async () => {
                    
                    await supertest(app)
                        .post(`/users/new`)
                        .send({
                            "email": "aneevel15@gmail.com",
                            "password": "testpassword",
                            "lname" : "McTest",
                            "fname" : "Davey"
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("User with email already exists");
                        });
                });
            });

            describe('Given no password was provided', () => {
                
                it('Should return a 400 error and an error message stating a password of at least 8 characters must be provided', async () => {
                    
                    await supertest(app)
                        .post(`/users/new`)
                        .send({
                            "email": "test@mctest.com",
                            "password": "",
                            "lname": "McTest",
                            "fname": "Davey"
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("A password of at least 8 characters must be provided");
                        });
                });
            });

            describe('Given a too short password was provided', () => {
                
                it('Should return a 400 error and an error message stating a password of at least 8 characters must be provided', async () => {
                    
                    await supertest(app)
                        .post(`/users/new`)
                        .send({
                            "email": "test@mctest.com",
                            "password": "short",
                            "lname": "McTest",
                            "fname": "Davey"
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("A password of at least 8 characters must be provided");
                        });
                });
            });

            describe('Given no last name provided', () => {
                
                it('Should return a 400 error and an error message stating a non-empty last name of less than 50 characters must be provided', async () => {
                    
                    await supertest(app)
                        .post(`/users/new`)
                        .send({
                            "email": "test@mctest.com",
                            "password": "testpassword",
                            "lname": "",
                            "fname": "Davey"
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("A non-empty last name of less than 50 characters must be provided");
                        });
                });
            });

            describe('Given too long of a last name provided', () => {
                
                it('Should return a 400 error and an error message stating a non-empty last name of less than 50 characters must be provided', async () => {
                    
                    await supertest(app)
                        .post(`/users/new`)
                        .send({
                            "email": "test@mctest.com",
                            "password": "testpassword",
                            "lname": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                            "fname": "Davey"
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("A non-empty last name of less than 50 characters must be provided");
                        });
                });
            });

            describe('Given no first name provided', () => {
                
                it('Should return a 400 error and an error message stating a non-empty first name of less than 50 characters must be provided', async () => {
                    
                    await supertest(app)
                        .post(`/users/new`)
                        .send({
                            "email": "test@mctest.com",
                            "password": "testpassword",
                            "lname": "McTest",
                            "fname": ""
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("A non-empty first name of less than 50 characters must be provided");
                        });
                });
            });

            describe('Given too long first name provided', () => {
                
                it('Should return a 400 error and an error message stating a non-empty first name of less than 50 characters must be provided', async () => {
                    
                    await supertest(app)
                        .post(`/users/new`)
                        .send({
                            "email": "test@mctest.com",
                            "password": "testpassword",
                            "lname": "McTest",
                            "fname": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("A non-empty first name of less than 50 characters must be provided");
                        });
                });
            });
        });

        describe('Given valid parameters', () => {
            
            it('Should return a 201 code and a valid User object', async () => {
                
                let user;
                await supertest(app)
                    .post(`/users/new`)
                    .send({
                        "email": "valid@email.com",
                        "password": "validpassword",
                        "lname": "User",
                        "fname": "Valid"
                    })
                    .expect(201)
                    .then((response) => {
                        user = response.body;
                        expect(response.body.id).toBeTruthy();
                        expect(response.body.message).toBe("User created");
                    });
                
                await supertest(app)
                    .delete(`/users/${user.id.insertedId}`);

            });
        });
    });

    describe('DELETE User', () => {
    
        describe('Given non-existing userID', () => {
            
            it('Should return a 204 code', async () => {
                
                await supertest(app)
                    .delete(`/users/${nonexistingUserID}`)
                    .expect(204)
            });
        });

        describe('Given invalid userID', () => {

            it('Should return a 500 code and an error message stating hex string must be 24 characters', async () => {

                await supertest(app)
                    .delete(`/users/0`)
                    .expect(500)
                    .then((response) => {
                        expect(response.body.message).toBe("hex string must be 24 characters");
                    });
            });
        });

        describe('Given valid, existing userID', () => {
            
            it('Should return a 204 code and delete the user', async () => {
                
                let user;
                await supertest(app)
                    .post(`/users/new`)
                    .send({
                        "email": "deletetest@email.com",
                        "password": "validpassword",
                        "lname": "User",
                        "fname": "Valid"
                    })
                    .then((response) => {
                        user = response.body
                    });

                await supertest(app)
                    .delete(`/users/${user.id.insertedId}`)
                    .expect(204);

                await supertest(app)
                    .get(`/users/${user.id.insertedId}`)
                    .expect(404);
            });
        });

    });

    describe('PATCH User', () => {
        
        describe('Given invalid parameters', () => {
            
            describe('Given an already existing email was provided', () => {

                it('Should return a 400 error and an error message stating an email address that is not already in use must be provided', async () => {
                    
                    await supertest(app)
                        .patch(`/users/${modifyUserID}`)
                        .send({ "email": "aneevel15@gmail.com" })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toEqual("This email address is already in use");
                        });
                });
            });

            describe('Given an invalid email was provided', () => {

                it('Should return a 400 error and an error message stating a valid email address must be provided', async () => {
                    
                    await supertest(app)
                        .patch(`/users/${modifyUserID}`)
                        .send({ "email": "invalidemail" })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toEqual("A valid email address must be provided");
                        });
                });
            });

            describe('Given a password that is too short was provided', () => {
                
                it('Should return a 400 error and an error message stating password greater than 8 characters must be provided', async () => {
                    await supertest(app)
                        .patch(`/users/${modifyUserID}`)
                        .send({ "password": "short" })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toEqual("A password greater than 8 characters and less than 50 characters must be provided");
                        });
                });
            });

            describe('Given a password that is too long was provided', () => {
                
                it('Should return a 400 error and an error message stating a password less than 50 characters must be provided', async () => {
                    
                    await supertest(app)
                        .patch(`/users/${modifyUserID}`)
                        .send({ "password": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toEqual("A password greater than 8 characters and less than 50 characters must be provided");
                        });
                });
            });

            describe('Given a last name exceeding 50 characters was provided', () => {
                
                it('Should return a 400 error and an error message stating a last name must not exceed 50 characters', async () => {

                    await supertest(app)
                        .patch(`/users/${modifyUserID}`)
                        .send({ "lname": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toEqual("A last name must not exceed 50 characters");
                        });
                });
            });

            describe('Given a first name exceeding 50 characters was provided', () => {
                
                it('Should return a 400 error and an error message stating a first name must not exceed 50 characters', async () => {
                        
                    await supertest(app)
                        .patch(`/users/${modifyUserID}`)
                        .send({ "fname": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toEqual("A first name must not exceed 50 characters");
                        });
                });
            });

            describe('Given a non-existing user provided', () => {

                it('Should return a 404 code and an error message stating no user with ID was found', async () => {
                    
                    await supertest(app)
                        .patch(`/users/000000000000000000000000`)
                        .send({
                            "fname": "Alec"
                        })
                        .expect(404)
                        .then((response) => {
                            expect(response.body.message).toEqual("No user with ID was found");
                        });
                });
            });
        });

        describe('Given valid parameters', () => {

            describe('Given no params to patch', () => {

                it('Should return a 204 code and a message stating no parameters were provided to patch', async () => {
                    
                    await supertest(app)
                        .patch(`/users/${modifyUserID}`)
                        .send({})
                        .expect(204);
                });
            });

            describe('Given a valid email', () => {

                it('Should return a 200 code and an updated User with email', async () => {
                    await supertest(app)
                        .patch(`/users/${modifyUserID}`)
                        .send({ "email" : "validpatchemail@gmail.com" })
                        .expect(200)
                        .then((response) => {
                            expect(response.body.user.email).toEqual("validpatchemail@gmail.com");
                        });
                });
            });

            describe('Given a valid password', () => {

                it('Should return a 200 code and an updated User with password', async () => {
                    
                    await supertest(app)
                        .patch(`/users/${modifyUserID}`)
                        .send({ "password" : "testpassword" })
                        .expect(200)
                        .then((response) => {
                            expect(response.body.user.password).toEqual("testpassword");
                        });
                });
            });

            describe('Given a valid first name', () => {
                
                it('Should return a 200 code and an updated User with first name', async () => {

                });
            });

            describe('Given a valid last name', () => {

                it('Should return a 200 code and an updated User with last name', async () => {

                });
            });
        });
    });
});
