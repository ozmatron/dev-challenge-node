let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
var request = require('supertest');

const {expect} = chai;
chai.use(chaiHttp);

var authenticatedUser = request.agent(server);

before(function(done){
    authenticatedUser
      .post('/api/login')
      .send({"email": "sinny@jom.ie","password": "dave"})
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

describe('GET user data', function(done){ 

    it('should return a 200 response if the user logged in', function(done){
        authenticatedUser.get('/api/user_data')
        .end(function(err, res){
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("email", "sinny@jom.ie");
            expect(res.body).to.have.property("id", 17);
            expect(res.body).to.have.property("username", "Sinny");
            done();
            });
    });

    it('should return user tasks', function(done){
        authenticatedUser.get('/api/tasks/17')
        .end(function(err, res){
            expect(res).to.have.status(200);
            expect(res.body[0]).to.have.property("task", "Clean kitchen");
            expect(res.body[0]).to.have.property("id", 102);
            done();
            });
    });

    it('should return user images', function(done){
        authenticatedUser.get('/api/images/17')
        .end(function(err, res){
            expect(res).to.have.status(200);
            expect(res.body).to.have.length(3);
            done();
            });
        });

});