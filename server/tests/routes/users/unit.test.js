const supertest = require('supertest');
const app = require('../../../server');
const { createTestUser } = require('../../helpers/test-utils');

describe('Users', () => {
    let testUser;

    beforeEach(async () => {
        testUser = await createTestUser(`test${Date.now()}@example.com`);
    });

    describe('GET ALL Users', () => {
        it('Should return a 200 code and a collection of users', async () => {
            await supertest(app)
                .get('/users')
                .expect(200)
                .then((response) => {
                    expect(Array.isArray(response.body)).toBeTruthy();
                    expect(response.body.length).toBeGreaterThan(0);
                });
        });
    });

    describe('GET User with ID', () => {
        it('Should return a 200 code and a user object', async () => {
            await supertest(app)
                .get(`/users/${testUser.id}`)
                .expect(200)
                .then((response) => {
                    expect(response.body).toHaveProperty('email');
                    expect(response.body).toHaveProperty('lname');
                    expect(response.body).toHaveProperty('fname');
                });
        });

        it('Should return 404 for non-existing user', async () => {
            await supertest(app)
                .get('/users/000000000000000000000000')
                .expect(404)
                .then((response) => {
                    expect(response.body).toEqual({
                        success: false,
                        message: "No user with ID exists"
                    });
                });
        });

        it('Should return 500 for invalid ID format', async () => {
            await supertest(app)
                .get('/users/invalid-id')
                .expect(500);
        });
    });

    describe('DELETE User', () => {
        it('Should return a 204 code and delete the user', async () => {
            await supertest(app)
                .delete(`/users/${testUser.id}`)
                .expect(204);

            await supertest(app)
                .get(`/users/${testUser.id}`)
                .expect(404);
        });

        it('Should return 404 for non-existing user', async () => {
            await supertest(app)
                .delete('/users/000000000000000000000000')
                .expect(404)
                .then((response) => {
                    expect(response.body).toEqual({
                        success: false,
                        message: "User not found"
                    });
                });
        });
    });

    describe('PATCH User', () => {
        describe('Given valid parameters', () => {
            it('Should update user email', async () => {
                const newEmail = `updated${Date.now()}@example.com`;
                await supertest(app)
                    .patch(`/users/${testUser.id}`)
                    .send({ email: newEmail })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.success).toBe(true);
                        expect(response.body.user.email).toEqual(newEmail);
                    });
            });

            it('Should update user name', async () => {
                await supertest(app)
                    .patch(`/users/${testUser.id}`)
                    .send({ lname: 'UpdatedName' })
                    .expect(200)
                    .then((response) => {
                        expect(response.body.success).toBe(true);
                        expect(response.body.user.lname).toEqual('UpdatedName');
                    });
            });

            it('Should return 204 when no changes requested', async () => {
                await supertest(app)
                    .patch(`/users/${testUser.id}`)
                    .send({})
                    .expect(204);
            });
        });

        describe('Given invalid parameters', () => {
            it('Should reject invalid email format', async () => {
                await supertest(app)
                    .patch(`/users/${testUser.id}`)
                    .send({ email: 'invalid-email' })
                    .expect(400)
                    .then((response) => {
                        expect(response.body).toEqual({
                            success: false,
                            message: "A valid email address must be provided"
                        });
                    });
            });

            it('Should reject duplicate email', async () => {
                const otherUser = await createTestUser(`other${Date.now()}@example.com`);
                await supertest(app)
                    .patch(`/users/${testUser.id}`)
                    .send({ email: otherUser.email })
                    .expect(400)
                    .then((response) => {
                        expect(response.body).toEqual({
                            success: false,
                            message: "This email address is already in use"
                        });
                    });
            });
        });
    });
});

describe('User Registration', () => {
    describe('Given invalid parameters', () => {
        it('Should return 400 when no parameters provided', async () => {
            await supertest(app)
                .post('/register')
                .send({})
                .expect(400)
                .then((response) => {
                    expect(response.body).toEqual({
                        success: false,
                        message: "Improper params supplied"
                    });
                });
        });

        it('Should return 400 for invalid email', async () => {
            await supertest(app)
                .post('/register')
                .send({
                    email: 'invalid-email',
                    password: 'password123',
                    fname: 'Test',
                    lname: 'User'
                })
                .expect(400)
                .then((response) => {
                    expect(response.body).toEqual({
                        success: false,
                        message: "A valid, non-existing email must be provided"
                    });
                });
        });

        it('Should return 400 for existing email', async () => {
            const email = `test${Date.now()}@example.com`;
            await createTestUser(email);
            
            await supertest(app)
                .post('/register')
                .send({
                    email,
                    password: 'password123',
                    fname: 'Test',
                    lname: 'User'
                })
                .expect(400)
                .then((response) => {
                    expect(response.body).toEqual({
                        success: false,
                        message: `User with email ${email} already exists`
                    });
                });
        });
    });

    describe('Given valid parameters', () => {
        it('Should successfully register new user', async () => {
            await supertest(app)
                .post('/register')
                .send({
                    email: `test${Date.now()}@example.com`,
                    password: 'password123',
                    fname: 'Test',
                    lname: 'User'
                })
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual({
                        success: true,
                        message: "User created",
                        id: expect.stringMatching(/^[0-9a-fA-F]{24}$/)
                    });
                });
        });
    });
});
