var assert = require('assert'),
 http = require('http'),
 base_url = "http://localhost:3000/";
 var chai = require('chai');
var chaijsonequal = require("chai-json-equal");
chai.use(chaijsonequal);
var expect = chai.expect;


describe('/api/register', function () {
  it('should return students registered for a given teacher', function (done) {
  	var payload = { "teacher": "teacherbenny@gmail.com",
					 "students":[
					      "studentseal@gmail.com",
					      "studentsid@gmail.com"
					  ]
				  }
	var options = { hostname: 'localhost',
				  	port: 3000,
				  	path: '/api/register',
				  	method: 'POST',
				  	headers: {
				    	'Content-Type': 'application/json'
				 	 },
				  	body: payload
				   };

    http.request(options, function (res) {
      res.on('end', function () {
        assert.equal(204, res.statusCode);
        done();
      });
    }).end();
  });
});