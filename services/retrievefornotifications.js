var connection = require("../connection");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

function retrievefornotifications(response, postData){

	var jsondata = postData;
	
	
	var teacher = jsondata.teacher;
	var notification  = jsondata.notification;
	var students_list = notification.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
	console.log("IN RETRIVE STUDENTS  FROM JSON ")
	console.log(students_list);
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

  		} 	

		else {
     		//checking if student exists in the student table
     		connection.connection.query('select student_id from registrationdetails where teacher_id = ? AND suspension_status = \'false\'',teacher, function(err,result) {
		  		if(err) {
		    		response.writeHead(400);
					response.write("ERROR in students: "+err);
		     		response.end();
		  		} else {
		  			for( var i = 0; i <result.length; i++){
		  				students_list.push(result[i].student_id);
		  			}
		  			var unique_students = students_list.filter((x, i , a) => a.indexOf(x) == i);
		  			response.writeHead(200, { 'Content-Type': 'application/json' });
		  			var recipients = {
		  				"success":{
		  					"message":"Notification sent  suuccessfully"
		  				},
		  				"recipients":unique_students
		  			}
		     		response.end(JSON.stringify(recipients));
				} 
				 
			});  	
 		}
	});

 }


exports.retrievefornotifications = retrievefornotifications;



