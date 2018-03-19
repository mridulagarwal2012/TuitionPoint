var server = require("./server");
var router = require("./router");
var register = require("./services/register.js")
var commonstudents = require("./services/commonstudents.js")
var suspend = require("./services/suspend.js")
var retrievefornotifications = require("./services/retrievefornotifications.js")
var handle = {}

handle["/api/register"] = register.register;
handle["/api/commonstudents"] = commonstudents.commonstudents;
handle["/api/suspend"] = suspend.suspend;
handle["/api/retrievefornotifications"] = retrievefornotifications.retrievefornotifications;

server.start(router.route, handle);

module.exports = () => 'Student managemnt system';
