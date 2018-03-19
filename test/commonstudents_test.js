var assert = require('assert'),
 http = require('http'),
 base_url = "http://localhost:3001/";
var chai = require('chai');
var chaijsonequal = require("chai-json-equal");
chai.use(chaijsonequal);
var expect = chai.expect;


describe('/api/commonstudents', function () {
  it('should return students registered for a given teacher', function (done) {
    http.get(base_url+'api/commonstudents?teacher=teacherkenny%40gmail.com', function (res) {
      var data = '';
      var expected_data = {students: ["studentseal@gmail.com","studentamol@gmail.com"]};

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal(200, res.statusCode);
        var jsonData = JSON.parse(data);
        expect(expected_data).to.deep.equal(jsonData);
        done();
      });
    });
  });
  
  it('should return common students for a given set of teachers', function (done) {
    http.get(base_url+'api/commonstudents?teacher=teacherkenny%40gmail.com&teacher=teacherbenny%40gmail.com', function (res) {
      var data = '';
      var expected_data = {students: [ "studentseal@gmail.com"]};

      res.on('data', function (chunk) {
        data += chunk;
      });


      res.on('end', function () {
        assert.equal(200, res.statusCode);
        var jsonData = JSON.parse(data);
        expect(expected_data).to.deep.equal(jsonData);
        done();
      });
    });
  });

  it('Should result in a bad request, as the teacher(s) is not found', function (done) {
    http.get(base_url+'api/commonstudents?teacher=teachersam%40gmail.com&teacher=teacherbenny%40gmail.com', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal(400, res.statusCode);
        assert.equal("Teacher(s) not found", data);
        done();
      });
    });
  });

  it('Should result in a bad request, as more than two teachers were sent', function (done) {
    http.get(base_url+'api/commonstudents?teacher=teacherkenny%40gmail.com&teacher=teacherbenny%40gmail.com&teacher=teachermikey%40gmail.com', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal(400, res.statusCode);
        assert.equal("There should be at most 2 teachers.", data);
        done();
      });
    });
  });

  it('Should result in an empty list, as the two teachers do not have any common students', function (done) {
    http.get(base_url+'api/commonstudents?teacher=teachermikey%40gmail.com&teacher=teacherbenny%40gmail.com', function (res) {
      var data = '';
      var expected_data = {students: []};

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal(200, res.statusCode);
        var jsonData = JSON.parse(data);
        expect(expected_data).to.deep.equal(jsonData);
        done();
      });
    });
  });
});