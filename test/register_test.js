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

var payload = { "teacher": "teacherbenny@gmail.com",
					 "students":[
					      "studentseal@gmail.com",
					      "studentsid@gmail.com"
					  ]
			  }
var payload_wrongTeacher = { "teacher": "teacherdanny@gmail.com",
           "students":[
                "studentseal@gmail.com",
                "studentsid@gmail.com"
            ]
        }

var payload_wrongStudent = { "teacher": "teacherbenny@gmail.com",
           "students":[
                "studentmay@gmail.com",
                "studentsid@gmail.com"
            ]
        }

describe('/api/register', function () {
  it('should return students registered for a given teacher', function (done) {
  	
	 chai.request('http://localhost:3000')
        .post('/api/register')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          done();
      });
  });
  it('should return bad request as the given teacher is not found', function (done) {
    
   chai.request(base_url)
        .post('api/register')
        .send(payload_wrongTeacher)
        .end((err, res) => {
          res.should.have.status(400);
          done();
      });
  });
  it('should return bad request as given student(s) not found', function (done) {
    
   chai.request(base_url)
        .post('api/register')
        .send(payload_wrongStudent)
        .end((err, res) => {
          res.should.have.status(400);
          done();
      });
  });
});