var connection = require("../connection");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

function addteachers(response, postData){

	var jsondata = postData;
	
	
	var teachers = jsondata.teachers;
	var valid_teachers = [];
	for(var i=0; i< jsondata.teachers.length; i++){
	 if(jsondata.teachers[i].match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)){
	 	valid_teachers.push([jsondata.teachers[i]]);
	 }
	}
	if(teachers.length!=valid_teachers.length){
		response.writeHead(400, { 'Content-Type': 'application/json' });
		var valid_teacher = {
  				"Error":{
  					"message": "Please enter valid teacher id"
  				}
  			}
     		response.end(JSON.stringify(valid_teacher));
	}

	else{
		var teachers_listQuery = "teacher_id = '" + jsondata.teachers[0] + "' ";

	
		for(var i=0; i< jsondata.teachers.length; i++){
			if(i === 0){
				continue;
			}
			teachers_listQuery += "OR teacher_id = '" + jsondata.teachers[i] + "'";
		}

		connection.connection.query('select teacher_id from teacher where ' + teachers_listQuery, function(err,result) {
			if(err) {
    		response.writeHead(400);
			response.write("ERROR: "+err);
     		response.end();
  			}
  			else if(result.length >0){
  				response.writeHead(400, { 'Content-Type': 'application/json' });
	  			var teacher_exist = {
	  				"Error":{
	  					"message": "Teacher(s) already exists"
	  				}
	  			}
	     		response.end(JSON.stringify(teacher_exist));

  			}
  			else{
  				connection.connection.query('Insert into teacher (teacher_id) VALUES ?', [valid_teachers], function(err,result){

	  				if(err) {
			    		console.log("Error in insert :" + err);
			     		response.writeHead(400);
			     		response.end();
			  		} else {
			     		console.log("Teacher(s) successfully added");
			     		response.writeHead(200, { 'Content-Type': 'application/json' });
			  			var Teacher_added = {
			  				"Success":{
			  					"message": "Teacher(s) successfully added"
			  				}
	  					}		
	 					response.end(JSON.stringify(Teacher_added));
				 	}	
  				});
  			}
  		});
	}	

 }


exports.addteachers = addteachers;



