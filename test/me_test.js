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

describe('me', () => {
    let ids;
    let joesToken;
    let janesToken;
    before(async () => {
        ids = await seedTestDB();
    });

    describe('get current user', () => {
        it('should return the current users profile information if authorized', async () => {
            const tokenResponse = await chai.request(app)
            .post('/auth/signin')
            .send({"username": "Joe Bloggs", "password": "test"});
            joesToken = tokenResponse.body.token;

            const response = await chai.request(app)
            .get('/api/me')
            .set('Authorization', `Bearer ${joesToken}`);

            expect(response.status).to.equal(200);
            expect(response.body._id).to.equal(ids.joesId.toString());
        });
    });

    describe('check if following a user', () => {
        it('should return true if the current user is following the given user', async () => {
            const response = await chai.request(app)
            .get(`/api/me/follows/${ids.janesId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.equal(true);
        });
        it("should return false if the current user isn't following the given user", async () => {
            const tokenResponse = await chai.request(app)
            .post('/auth/signin')
            .send({"username": "Jane Doe", "password": "password"});
            janesToken = tokenResponse.body.token;

            const response = await chai.request(app)
            .get(`/api/me/follows/${ids.joesId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.equal(false);
        });
    });

    describe('follow a user', () => {
        it('should respond with a 204 after successfully following a user', async () => {
            const response = await chai.request(app)
            .put(`/api/me/follows/${ids.joesId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(204);
        });
        it('should respond with an error if current user was already following the user', async () => {
            const response = await chai.request(app)
            .put(`/api/me/follows/${ids.joesId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(400);
            expect(response.text).to.equal('Follow request unsuccessfull; you are already following that user.');
            
        });
    });

    describe('unfollow a user', () => {
        it('should respond with a 204 after successfully unfollowing a user', async () => {
            const response = await chai.request(app)
            .delete(`/api/me/follows/${ids.joesId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(204);
        });
        it("should respond with an error if current user wasn't already following the user", async () => {
            const response = await chai.request(app)
            .delete(`/api/me/follows/${ids.joesId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(400);
            expect(response.text).to.equal("Unfollow request unsuccessfull; you weren't following that user.");  
        });
    });

    describe('check if kudos given to post', () => {
        it('should return true if the current user has given kudos to the post', async () => {
            const response = await chai.request(app)
            .get(`/api/me/kudos/${ids.joesPostId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.equal(true);
        });
        it("should return false if the current user hasn't given kudos to the post", async () => {
            const response = await chai.request(app)
            .get(`/api/me/kudos/${ids.joesPostId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.equal(false);
        });
    });
    
    describe('give kudos to a post', () => {
        it('should respond with a 204 after successfully giving kudos', async () => {
            const response = await chai.request(app)
            .put(`/api/me/kudos/${ids.joesPostId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(204);
        });
        it('should respond with an error if current user has already given kudos', async () => {
            const response = await chai.request(app)
            .put(`/api/me/kudos/${ids.joesPostId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(400);
            expect(response.text).to.equal('Give kudos request unsuccessfull; you have already given kudos to this post.');
            
        });
    });

    describe('remove kudos from a post', () => {
        it('should respond with a 204 after successfully removing kudos', async () => {
            const response = await chai.request(app)
            .delete(`/api/me/kudos/${ids.joesPostId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(204);
        });
        it("should respond with an error if current user hadn't already given kudos", async () => {
            const response = await chai.request(app)
            .delete(`/api/me/kudos/${ids.joesPostId.toString()}`)
            .set('Authorization', `Bearer ${janesToken}`);

            expect(response.status).to.equal(400);
            expect(response.text).to.equal("Remove kudos request unsuccessfull; you hadn't given kudos to this post.");
            
        });
    });

    describe('get all of currents users highlights for a given post', () => {
        it('should return an array of current users highlights for the given post', async () => {
            const response = await chai.request(app)
            .get(`/api/me/highlights/${ids.joesPostId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            expect(response.body[0]._id).to.equal(ids.highlightId.toString());
        });
    });

    describe('create a highlight for the given post', () => {
        it('should return the new highlight after creating it', async () => {
            const response = await chai.request(app)
            .put(`/api/me/highlights/${ids.joesPostId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`)
            .send({"excerpt": "cool stuff"});

            expect(response.status).to.equal(200);
            expect(response.body.user).to.equal(ids.joesId.toString());
            expect(response.body.post).to.equal(ids.joesPostId.toString());
            expect(response.body.excerpt).to.equal('cool stuff');
        });
        it('should return an error if the highlight is a duplicate', async () => {
            const response = await chai.request(app)
            .put(`/api/me/highlights/${ids.joesPostId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`)
            .send({"excerpt": "cool stuff"});

            expect(response.status).to.equal(400);
            expect(response.text).to.equal('Highlight creation unsuccessfull, you have already highlighted this excerpt.');
        });
    });

    describe('remove a highlight from the given post', () => {
        it('should remove the highlight if it exists', async () => {
            const response = await chai.request(app)
            .delete(`/api/me/highlights/${ids.joesPostId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`)
            .send({"excerpt": "cool stuff"});

            expect(response.status).to.equal(200);
            expect(response.body.user).to.equal(ids.joesId.toString());
            expect(response.body.post).to.equal(ids.joesPostId.toString());
            expect(response.body.excerpt).to.equal('cool stuff');
        });
        it("should return an error if the highlight doesn't exist", async () => {
            const response = await chai.request(app)
            .delete(`/api/me/highlights/${ids.joesPostId.toString()}`)
            .set('Authorization', `Bearer ${joesToken}`)
            .send({"excerpt": "cool stuff"});

            expect(response.status).to.equal(400);
            expect(response.text).to.equal("Highlight removal unsuccessfull, this highlight doesn't exist.");
        });
    });

    describe('upload profile avatar', () => {
        it('should return the updated user info upon success', async () => {
            const response = await chai.request(app)
            .put('/api/me/images')
            .set('Authorization', `Bearer ${joesToken}`)
            .attach('avatar', './test/avatar-correct.png', 'avatar-correct.png');

            expect(response.status).to.equal(200);
            expect(response.body._id).to.equal(ids.joesId.toString());
            expect(response.body.avatar).to.not.equal(null);
        });
        it('should return an error if an incorrect file format is used', async () => {
            const response = await chai.request(app)
            .put('/api/me/images')
            .set('Authorization', `Bearer ${joesToken}`)
            .attach('avatar', './test/avatar-incorrect.gif', 'avatar-incorrect.gif');

            expect(response.status).to.equal(400);
            expect(response.text).to.equal('Invalid file type submitted');
        });
    });

    describe('update current users info', () => {
        
        let response;
        before(async () => {
            response = await chai.request(app)
            .put('/api/me')
            .set('Authorization', `Bearer ${joesToken}`)
            .send({
                "email": "newemail@newhost.com", 
                "avatar": "mynewpic.jpg",
                "foo": "bar"
            });
        });

        it('should return the updated user info on success', () => {
            expect(response.status).to.equal(200);
            expect(response.body._id).to.equal(ids.joesId.toString());
            expect(response.body.email).to.equal('newemail@newhost.com');
        });
        it("should ignore any properties it doesn't have permission to change", () => {
            expect(response.body.avatar).to.not.equal('mynewpic.jpg');
        });
        it("should ignore any properties which don't exist on the schema", () => {
            expect(response.body.foo).to.equal(undefined);
        });
    });

    describe('delete current user', () => {
        
        let response;
        before(async () => {
            response = await chai.request(app)
            .delete('/api/me')
            .set('Authorization', `Bearer ${joesToken}`);
        });

        it('should return the user object after deletion', () => {
            expect(response.status).to.equal(200);
            expect(response.body._id).to.equal(ids.joesId.toString());
        });
        it('should cause a subsequent search for that user to fail', async () => {
            const response = await chai.request(app)
            .get(`/api/users/${ids.joesId}`);

            expect(response.status).to.equal(500);
            expect(response.text).to.equal('No user with that id');
        });
        it('should also remove the users posts', async() => {
            const response = await chai.request(app)
            .get(`/api/posts/${ids.joesPostId}`);

            expect(response.status).to.equal(500);
            expect(response.text).to.equal('No post with that id');
        });
        it('should leave the users comments in the DB, but remove the content', async () => {
            const response = await chai.request(app)
            .get(`/api/comments/${ids.joesTopLevelCommentId}`);

            expect(response.status).to.equal(200);
            expect(response.body.author).to.equal(null);
            expect(response.body.text).to.equal('Deleted');
        });
    });

});