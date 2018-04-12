process.env.NODE_ENV = 'testing';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server/server');
const config = require('../server/config/config');
const User = require('../server/api/user/userModel');
const seedTestDB = require('./test_seed');
chai.use(chaiHttp);

describe('auth', () => {
    let ids;
    before(async () => {
        ids = await seedTestDB();
    });
    describe('authenticate user', () => {
        it('should respond with a JWT when a user logs in with the correct credentials', async () => {
            const response = await chai.request(app)
            .post('/auth/signin')
            .send({"username": "Joe Bloggs", "password": "test"});

            expect(response.status).to.equal(200);
            expect(response.body.token).to.be.a('string');
            
        });
        it('should respond with a 401 error if the username or password is incorrect', async () => {
            const response = await chai.request(app)
            .post('/auth/signin')
            .send({"username": "Joe Blogs", "password": "text"});
            
            expect(response.status).to.equal(401);
        });
        it('should respond with a 400 error if the username or password are missing', async () => {
            const response = await chai.request(app)
            .post('/auth/signin')
            .send({"username": "Joe Bloggs"});

            expect(response.status).to.equal(400);
        });
    });
})