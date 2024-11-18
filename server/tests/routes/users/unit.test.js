const supertest = require('supertest');
const app = require('../../../server');

const existingUserID = '66a2c3b69d5dbcf506d743bb';

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
                        expect(response.body.user).toHaveProperty('email');
                        expect(response.body.user).toHaveProperty('password');
                        expect(response.body.user).toHaveProperty('lname');
                        expect(response.body.user).toHaveProperty('fname');
                        expect(response.body.user).toHaveProperty('confirmed');
                        expect(response.body.user).toHaveProperty('admin');
                    });
            });
        });
    });
});