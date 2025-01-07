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
    
    console.log('Registration response status:', response.status);
    console.log('Registration response body:', JSON.stringify(response.body, null, 2));
    return {
        email: email,
        ...response.body,
        id: response.body.id
    };
}

module.exports = {
    createTestUser
}; 
