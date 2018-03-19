var assert = require('assert'),
 http = require('http'),
 base_url = "http://localhost:3000/";
var chai = require('chai');
var server = require('../server');
let chaiHttp = require('chai-http');
var chaijsonequal = require("chai-json-equal");
let should = chai.should();
chai.use(chaijsonequal);
chai.use(chaiHttp);
var expect = chai.expect;

var payload = {
  "teacher":  "teacherkenny@gmail.com",
  "notification": "Hello students! @studentseal@gmail.com @studentsid@gmail.com"
}

var wrongTeacherPayload = {
  "teacher":  "teacherdanny@gmail.com",
  "notification": "Hello students! @studentseal@gmail.com @studentsid@gmail.com"
}



describe('/api/retrievefornotifications', function () {
  it('should return students who will receive the notification', function (done) {
  	
	 chai.request(base_url)
        .post('api/retrievefornotifications')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          done();
      });
  });

  it('should return bad request as the given teacher is not found', function (done) {
    
   chai.request(base_url)
        .post('api/retrievefornotifications')
        .send(wrongTeacherPayload)
        .end((err, res) => {
          res.should.have.status(400);
          done();
      });
  });
})