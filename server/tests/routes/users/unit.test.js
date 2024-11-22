const supertest = require('supertest');
const app = require('../../../server');

const existingUserID = '66a2c3b69d5dbcf506d743bb';
const nonexistingUserID = '000000000000000000000000';
const invalidUserID = '0';

jest.mock('../../../middleware/validate-jwt', () => jest.fn((req, res, next) => {
    return next(null);
}));

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
                            "password": "testpassword"
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
                            "password": "testpassword"
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
                            "password": "testpassword"
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
                        })
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toBe("A password of at least 8 characters must be provided");
                        });
                });
            });
        });
    });
});
