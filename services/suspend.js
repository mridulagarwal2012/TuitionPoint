var connection = require("../connection");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

function suspend(response, postData){

	var jsondata = postData;
	
	var values = [];
	var student = jsondata.student;
 
    //checking if student exists in the student table
	connection.connection.query('select * from student where student_id  = ?',student, function(err,result) {
		if(err) {
			response.writeHead(400);
			response.write("ERROR in students: "+err);
	 		response.end();
		} else if(result.length < 1){
			response.writeHead(400, { 'Content-Type': 'application/json' });
		  			var student_not_found = {
		  				"Error":{
		  					"message": "Student(s) not found"
		  				}
  					}
     				response.end(JSON.stringify(student_not_found));
		} else{
			//Updating the suspension status of the particular student
			connection.connection.query('UPDATE  registrationdetails SET suspension_status =\'true\' where student_id = ?', student , function(err,result) {
		  		if(err) {
		    		console.log("Error in suspension: " + err);
		     		response.writeHead(400); 
		     		response.end();
		  		} else {
		     		console.log("Student(s) successfully suspended");
		     		response.writeHead(200, { 'Content-Type': 'application/json' });
		  			var student_suspend = {
		  				"Success":{
		  					"message": "Student suspened successfully"
		  				}
  					}
     				response.end(JSON.stringify(student_suspend));
		 		}
			});
		}
	});  		
}


exports.suspend = suspend;

