var server = require("./server");
var router = require("./router");
var register = require("./services/register.js")
var commonstudents = require("./services/commonstudents.js")
var suspend = require("./services/suspend.js")
var retrievefornotifications = require("./services/retrievefornotifications.js")
var addstudents = require("./services/addstudents.js")
var addteachers = require("./services/addteachers.js")
var handle = {}

handle["/api/register"] = register.register;
handle["/api/commonstudents"] = commonstudents.commonstudents;
handle["/api/suspend"] = suspend.suspend;
handle["/api/retrievefornotifications"] = retrievefornotifications.retrievefornotifications;
handle["/api/addstudents"] = addstudents.addstudents;
handle["/api/addteachers"] = addteachers.addteachers;

server.start(router.route, handle);

module.exports = () => 'Student managemnt system';
