const supertest = require('supertest');
const app = require('../../server');

async function createTestUser(email = 'test@example.com') {
    const response = await supertest(app)
        .post('/register')
        .send({
            email: email,
            password: 'testpassword123',
            lname: 'Test',
            fname: 'User'
        });
    
    return response.body;
}

module.exports = {
    createTestUser
}; 