var connection = require("../connection");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

function addstudents(response, postData){

	var jsondata = postData;
	
	
	var students = jsondata.students;
	var valid_students =[];
	for(var i=0; i< jsondata.students.length; i++){
	 if(jsondata.students[i].match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)){
	 	valid_students.push([jsondata.students[i]]);
	 }
	}
	if(students.length!=valid_students.length){
		response.writeHead(400, { 'Content-Type': 'application/json' });
		var valid_student = {
  				"Error":{
  					"message": "Please enter valid student id"
  				}
  			}
     		response.end(JSON.stringify(valid_student));
	}

	else{
		var students_listQuery = "student_id = '" + jsondata.students[0] + "' ";

	
		for(var i=0; i< jsondata.students.length; i++){
			if(i === 0){
				continue;
			}
			students_listQuery += "OR student_id = '" + jsondata.students[i] + "'";
		}

		connection.connection.query('select student_id from student where ' + students_listQuery, function(err,result) {
			if(err) {
    		response.writeHead(400);
			response.write("ERROR: "+err);
     		response.end();
  			}
  			else if(result.length >0){
  				response.writeHead(400, { 'Content-Type': 'application/json' });
	  			var student_exist = {
	  				"Error":{
	  					"message": "Student(s) already exists"
	  				}
	  			}
	     		response.end(JSON.stringify(student_exist));

  			}
  			else{
  				connection.connection.query('Insert into student (student_id) VALUES ?', [valid_students], function(err,result){

	  				if(err) {
			    		console.log("Error in insert :" + err);
			     		response.writeHead(400);
			     		response.end();
			  		} else {
			     		console.log("Student(s) successfully added");
			     		response.writeHead(200, { 'Content-Type': 'application/json' });
			  			var student_added = {
			  				"Success":{
			  					"message": "Student(s) successfully added"
			  				}
	  					}		
	 					response.end(JSON.stringify(student_added));
				 	}	
  				});
  			}
  		});
	}	

 }


exports.addstudents = addstudents;



