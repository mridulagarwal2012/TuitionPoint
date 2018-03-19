var connection = require("../connection");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var url =  require('url');
var querystring = require('querystring');

function commonstudents(response, qstr){

	var q = querystring.parse(qstr);

	var teachersquery = "";
	var teachersqueryand = "";

	var selectQuery_commonStudents = "";
	var numberOfTeachers = 0;

	if(q.teacher instanceof Array){
		teachersquery = "teacher_id = '" + q.teacher[0] + "' ";
		teachersqueryand = "A.teacher_id = '" + q.teacher[0] + "' ";

		for(var i = 0; i < q.teacher.length; i++){
			if(i === 0){
				continue;
			}
			teachersquery += "OR teacher_id = '" + q.teacher[i] + "'";
			teachersqueryand += "AND B.teacher_id = '" + q.teacher[i] + "'";
		}
		selectQuery_commonStudents = "select A.student_id FROM registrationdetails as A , registrationdetails as B"
								+ " where A.student_id = B.student_id AND (  " 
								+ teachersqueryand
								+ ")";
		numberOfTeachers = q.teacher.length;

	} else{
		numberOfTeachers = 1;
		teachersquery = "teacher_id = '" + q.teacher + "'";
		selectQuery_commonStudents = "select student_id FROM registrationdetails where " + teachersquery;
	} 

  	//Checking if teacher existes in the teacher table
  	connection.connection.query('select * from teacher where ' + teachersquery, function(err,result) {
  		if(err) {
    		response.writeHead(400);
			response.write("ERROR: "+err);
     		response.end();
  		} else if(result.length < numberOfTeachers){
  			response.writeHead(400);
     		response.end("Teacher(s) not found");

  		} else {
  			if(numberOfTeachers > 2){
  				response.writeHead(400);
     			response.end("There should be at most 2 teachers.");
  			} else {
  				//getting students that are registerd
	     		connection.connection.query(selectQuery_commonStudents , function(err,result) {
			  		if(err) {
			    		response.writeHead(400);
						response.write("ERROR in students: "+err);
			     		response.end();
			  		} else {
			  			//response.writeHead(204);
			  			var students_list = [];
			  			for( var i = 0; i <result.length; i++){
			  				students_list.push(result[i].student_id);
			  			}
			  			var unique_students = students_list.filter((x, i , a) => a.indexOf(x) == i);
			  			response.writeHead(200, { 'Content-Type': 'application/json' });
			  			var commonstudents = {
			  				"students":unique_students
			  			}
			     		response.end(JSON.stringify(commonstudents));
					} 
				});
  			}  	
 		}
	});

 }


exports.commonstudents = commonstudents;