var connection = require("../connection");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

function register(response, postData){

	//console.log(postData);

	var jsondata = postData;
	
	var values = [];
	var teacher = jsondata.teacher;
	var students_listQuery = "student_id = '" + jsondata.students[0] + "' ";

	
	for(var i=0; i< jsondata.students.length; i++){
		values.push([jsondata.students[i],teacher,"false"]);
		if(i === 0){
			continue;
		}
		students_listQuery += "OR student_id = '" + jsondata.students[i] + "'";
	}
  	//Checking if teacher existes in the teacher table
  	connection.connection.query('select * from teacher where teacher_id = ?', teacher, function(err,result) {
  		if(err) {
    		response.writeHead(400);
			response.write("ERROR: "+err);
     		response.end();
  		}
  		else if(result.length < 1){
  			response.writeHead(400, { 'Content-Type': 'application/json' });
  			var teacher_not_found = {
  				"Error":{
  					"message": "Teacher not found"
  				}
  			}
     		response.end(JSON.stringify(teacher_not_found));
  			
     		

  		} else {
     		//checking if student exists in the student table
     		connection.connection.query('select * from student where '+students_listQuery, function(err,result) {
		  		if(err) {
		    		response.writeHead(400);
					response.write("ERROR in students: "+err);
		     		response.end();
		  		} else if(result.length < jsondata.students.length){
		  			response.writeHead(400, { 'Content-Type': 'application/json' });
		  			var student_not_found = {
		  				"Error":{
		  					"message": "Student(s) not found"
		  				}
  					}
     				response.end(JSON.stringify(student_not_found));
				} else{

					connection.connection.query('Select * FROM  registrationdetails Where teacher_id = ? AND ('+students_listQuery+')',teacher,function(err,result){
						if(err) {
				    		console.log("Error in insert :" + err);
				     		response.writeHead(400);
				     		response.end();
				     	} else if(result.length > 0){
				     		response.writeHead(400, { 'Content-Type': 'application/json' });
				  			var student_already_exist = {
				  				"Error":{
				  					"message": "Student(s) already registered"
				  				}
		  					}
		     				response.end(JSON.stringify(student_already_exist));
				     	} else {
				     		connection.connection.query('INSERT INTO registrationdetails (student_id, teacher_id, suspension_status) VALUES ?', [values], function(err,result) {
						  		if(err) {
						    		console.log("Error in insert :" + err);
						     		response.writeHead(400);
						     		response.end();
						  		} else {
						     		console.log("Student(s) successfully registered");
						     		response.writeHead(200, { 'Content-Type': 'application/json' });
						  			var student_not_found = {
						  				"Success":{
						  					"message": "Student(s) successfully registered"
						  				}
				  					}		
			     					response.end(JSON.stringify(student_not_found));
							 	}
							});

				    	}
					});
				}
			});  	
 		}
	});

 }


exports.register = register;



