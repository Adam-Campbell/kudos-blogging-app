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


describe('users', () => {
    let ids;
    before(async () => {
        // func is saved in ids variable so that the all of the ids it returns are available as 
        // properties of the ids object throughout the rest of the suite. 
        ids = await seedTestDB();
    });

    describe('get all users', () => {
        it('should return an array of any users that are present', async () => {
            const response = await chai.request(app)
             .get('/api/users');
             expect(response.status).to.equal(200);
             expect(response.body).to.be.an('array').that.is.not.empty;
             expect(response.body[0].hasOwnProperty('username')).to.be.true;
        });
    });

    describe('get one user', () => {
        it('should return the user if the user exists', async () => {
            const response = await chai.request(app)
             .get(`/api/users/${ids.joesId}`);

            expect(response.status).to.equal(200);
            expect(response.body._id).to.equal(ids.joesId.toString());
        });
        it("should return an error message if the user id supplied isn't valid", async () => {
            const response = await chai.request(app)
            .get('/api/users/fgh34dl87');
            
            expect(response.status).to.equal(500);
            expect(response.text).to.equal("The user id supplied wasn't valid");
        });
    });

    describe('get a users posts', () => {
        it('should return an array of the users posts if the user has posts', async () => {
            const response = await chai.request(app)
            .get(`/api/users/${ids.joesId}/posts`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            expect(response.body[0].author._id).to.equal(ids.joesId.toString());
        });
        it("should return an empty array if the user doesn't have any posts", async () => {
            const response = await chai.request(app)
            .get(`/api/users/${ids.janesId}/posts`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.empty;
        });
    });

    describe('get a users comments', () => {
        it('should return an array of the users comments if the user has comments', async () => {
            const response = await chai.request(app)
            .get(`/api/users/${ids.joesId}/comments`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            expect(response.body[0].author._id).to.equal(ids.joesId.toString());
        });
        it("should return an empty array if the user doesn't have any comments", async () => {
            const response = await chai.request(app)
            .get(`/api/users/${ids.janesId}/comments`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.empty;
        });
    });

    describe('get a users follow count', () => {
        it('should return an object detailing num of followers and num of following', async () => {
            const response = await chai.request(app)
            .get(`/api/users/${ids.joesId}/followers`);
            
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal({followers: 0, following: 1});
        });
    });

    describe('get a users kudos', () => {
        it('should return an array of the kudos the user has given if they have given any', async () => {
            const response = await chai.request(app)
            .get(`/api/users/${ids.joesId}/kudos`);

            expect(response.status).to.equal(200);
            expect(response.body[0].post._id).to.equal(ids.joesPostId.toString());
        });
        it("should return an empty array if the user hasn't given any kudos", async () => {
            const response = await chai.request(app)
            .get(`/api/users/${ids.janesId}/kudos`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.empty;
        });
    });

    describe('get a users highlights', () => {
        it('should return an array of the users highlights if they have created any', async () => {
            const response = await chai.request(app)
            .get(`/api/users/${ids.joesId}/highlights`);

            expect(response.status).to.equal(200);
            expect(response.body[0].excerpt).to.equal('It has cool stuff');
        });
        it("should return an empty array if the user hasn't created any highlights", async () => {
            const response = await chai.request(app)
            .get(`/api/users/${ids.janesId}/highlights`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.empty;
        });
    });

    describe('create a user', () => {
        it('should return the user that was created', async () => {
            const response = await chai.request(app)
            .post('/api/users')
            .send({"username": "Jon Snow", "password": "testing123", "email": "jon@castleblack.com"});
        
            expect(response.status).to.equal(200);
            expect(response.body.username).to.equal('Jon Snow');
            expect(response.body._id).to.be.a('string');
        });
    });

});
