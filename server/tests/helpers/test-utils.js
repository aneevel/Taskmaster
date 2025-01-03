const supertest = require('supertest');
const app = require('../../server');

async function createTestUser(email = 'test@example.com') {
    console.log('Creating test user with email:', email);
    const response = await supertest(app)
        .post('/register')
        .send({
            email: email,
            password: 'testpassword123',
            lname: 'Test',
            fname: 'User'
        });
    
    console.log('Registration response:', response.body);
    return response.body;
}

module.exports = {
    createTestUser
}; 