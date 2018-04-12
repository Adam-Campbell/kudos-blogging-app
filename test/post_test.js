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

describe('posts', () => {
    let ids;
    const newPostId = mongoose.Types.ObjectId();
    let joesToken;
    let janesToken;
    before(async () => {
        ids = await seedTestDB();
    });
    describe('get posts', () => {
        it('should return all posts if no category is supplied', async () => {
            const response = await chai.request(app)
            .get('/api/posts');

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            expect(response.body[0]._id).to.equal(ids.joesPostId.toString());
        });
        it('should return all posts for a category if one is supplied', async () => {
            const response = await chai.request(app)
            .get('/api/posts?category=javascript');

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            expect(response.body[0].categories[0]).to.equal('javascript');
        });
        it("should return an empty array if there aren't any posts for the category supplied", async () => {
            const response = await chai.request(app)
            .get('/api/posts?category=reactjs');
            
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.empty;
        });
    });

    describe('get one post', () => {
        it('should return the post it found if the id supplied is valid', async () => {
            const response = await chai.request(app)
            .get(`/api/posts/${ids.joesPostId}`);

            expect(response.status).to.equal(200);
            expect(response.body._id).to.equal(ids.joesPostId.toString());
        });
        it("should return an error if the id given isn't valid", async () => {
            const response = await chai.request(app)
            .get('/api/posts/fkj343gfk');

            expect(response.status).to.equal(500);
            expect(response.text).to.equal("The post id supplied wasn't valid");
        });
    });

    describe('create a post', () => {
        it('should return the newly created post', async () => {
            const tokenResponse = await chai.request(app)
            .post('/auth/signin')
            .send({"username": "Joe Bloggs", "password": "test"});
            joesToken = tokenResponse.body.token;
            
            const response = await chai.request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${joesToken}`)
            .send({
                "title": "Newly created post",
                "text": "Created inside test suite",
                "author": ids.joesId.toString(),
                "_id": newPostId.toString(),
                "categories": ['nodejs']
            });

            expect(response.status).to.equal(200);
            expect(response.body._id).to.equal(newPostId.toString());

        });
        it("should return an error if the categories supplied aren't valid", async () => {
            const response = await chai.request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${joesToken}`)
            .send({
                "title": "Newly created post",
                "text": "Created inside test suite",
                "author": ids.joesId.toString(),
                "_id": newPostId.toString(),
                "categories": ['jquery']
            });

            expect(response.status).to.equal(500);
        });
    });

    describe('update a post', () => {
        it('should return the updated post if the current user is authorized to update it', async () => {
            const response = await chai.request(app)
            .put(`/api/posts/${newPostId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`)
            .send({"text": "Edited inside test suite"});

            expect(response.status).to.equal(200);
            expect(response.body.text).to.equal('Edited inside test suite');
        });
        it("should return an error if the current user isn't authorized to update it", async () => {
            const tokenResponse = await chai.request(app)
            .post('/auth/signin')
            .send({"username": "Jane Doe", "password": "password"});
            janesToken = tokenResponse.body.token;
            
            const response = await chai.request(app)
            .put(`/api/posts/${newPostId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`)
            .send({"text": "Edited by Jane"});

            expect(response.status).to.equal(401);
        });
    });

    describe('delete a post', () => {
        it("should return an error if the current user isn't authorized to delete it", async () => {
            const response = await chai.request(app)
            .delete(`/api/posts/${newPostId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(401);
        });
        it('should return the deleted post if the current user is authorized to delete it', async () => {
            const response = await chai.request(app)
            .delete(`/api/posts/${newPostId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`);

            expect(response.status).to.equal(200);
            expect(response.body._id).to.equal(newPostId.toString());
        });
    });
    
    describe('get posts kudos count', () => {
        it('should return the number of kudos the post has received', async () => {
            const response = await chai.request(app)
            .get(`/api/posts/${ids.joesPostId.toString()}/kudos`);

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal({kudos: 1});
        });
    });

    describe('get a posts comments', () => {
        it('should return a nested tree structure of the posts comments', async () => {
            const response = await chai.request(app)
            .get(`/api/posts/${ids.joesPostId.toString()}/comments`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            expect(response.body[0]._id).to.equal(ids.joesTopLevelCommentId.toString());
            expect(response.body[0].replies[0]._id).to.equal(ids.joesNestedCommentId.toString());
            expect(response.body[0].replies[0].parents).to.deep.equal([
                ids.joesTopLevelCommentId.toString(),
                ids.joesNestedCommentId.toString()
            ]);
        });
    });
    describe('add a comment in reply to a post', () => {
        it('should return the newly created comment when successfull', async () => {
            const response = await chai.request(app)
            .post(`/api/posts/${ids.joesPostId.toString()}/comments`)
            .set('Authorization', `Bearer ${joesToken}`)
            .send({"text": "This comment was created inside the test suite!"});

            expect(response.status).to.equal(200);
            expect(response.body.text).to.equal('This comment was created inside the test suite!');
            expect(response.body.discussion).to.equal(ids.joesPostId.toString());
        });
    });
});