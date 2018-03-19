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
  "student" : "studentamol@gmail.com"
}


var wrongStudentPayload = {
  "student" : "studentanita@gmail.com"
}



describe('/api/suspend', function () {
  it('should suspend given student', function (done) {
  	
	 chai.request(base_url)
        .post('api/suspend')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(204);
          done();
      });
  });

  it('should return bad request as the given student is not found', function (done) {
    
   chai.request(base_url)
        .post('api/suspend')
        .send(wrongStudentPayload)
        .end((err, res) => {
          res.should.have.status(400);
          done();
      });
  });
});