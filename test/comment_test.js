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

describe('comments', () => {
    let ids;
    let joesToken;
    let janesToken;
    before(async () => {
        ids = await seedTestDB();
    });

    describe('get comments', () => {
        it('should return an array of all comments', async () => {
            const response = await chai.request(app)
            .get('/api/comments');

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            expect(response.body[0]._id).to.equal(ids.joesTopLevelCommentId.toString());
        });
    });

    describe('get one comment', () => {
        it('should return the comment if a valid comment is requested', async () => {
            const response = await chai.request(app)
            .get(`/api/comments/${ids.joesTopLevelCommentId.toString()}`);

            expect(response.status).to.equal(200);
            expect(response.body._id).to.equal(ids.joesTopLevelCommentId.toString());
        });
        it("should return an error if the comment requested doesn't exist", async () => {
            const response = await chai.request(app)
            .get(`/api/comments/${mongoose.Types.ObjectId()}`);

            expect(response.status).to.equal(500);
            expect(response.text).to.equal('No comment with that id');
        });
    });

    describe('reply to a comment', () => {
        it('should return the newly created comment when successfull', async () => {
            const tokenResponse = await chai.request(app)
            .post('/auth/signin')
            .send({"username": "Joe Bloggs", "password": "test"});
            joesToken = tokenResponse.body.token;
            
            const response = await chai.request(app)
            .post(`/api/comments/${ids.joesTopLevelCommentId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`)
            .send({"text": "This nested comment was created inside the test suite"});
            
            expect(response.status).to.equal(200);
            expect(response.body.text).to.equal('This nested comment was created inside the test suite');
        });
    });

    describe('edit a comment', () => {
        it('should return the updated comment if current user is authorized to update it', async () => {
            const response = await chai.request(app)
            .put(`/api/comments/${ids.joesTopLevelCommentId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`)
            .send({"text": "Updated inside test suite"});

            expect(response.status).to.equal(200);
            expect(response.body.text).to.equal('Updated inside test suite');
        });
        it("Should return an error if the current user isn't authorized to update the comment", async () => {
            const tokenResponse = await chai.request(app)
            .post('/auth/signin')
            .send({"username": "Jane Doe", "password": "password"});
            janesToken = tokenResponse.body.token;

            const response = await chai.request(app)
            .put(`/api/comments/${ids.joesTopLevelCommentId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`)
            .send({"textt": "This shouldn't work"});

            expect(response.status).to.equal(401);
        });
    });

    describe('delete a comment', () => {
        it("should return an error if the current user isn't authorized to delete the comment", async () => {
            const response = await chai.request(app)
            .delete(`/api/comments/${ids.joesTopLevelCommentId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(401);
        });
        it('should return the deleted comment if the current user is authorized to delete it', async () => {
            const response = await chai.request(app)
            .delete(`/api/comments/${ids.joesTopLevelCommentId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`);

            expect(response.status).to.equal(200);
            expect(response.body._id).to.equal(ids.joesTopLevelCommentId.toString());
        });
    });

});