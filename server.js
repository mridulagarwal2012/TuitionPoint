var http = require("http");
var url = require("url");
var querystring = require('querystring');

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		if(request.method.toLowerCase() == 'post'){
			var postData = "";
			console.log("Request for " + pathname + " received.");
			request.setEncoding("utf8");
			request.addListener("data", function(postDataChunk) {
				postData += postDataChunk;
				console.log("Received POST data chunk '"+
				postDataChunk + "'.");
			});
			request.addListener("end", function() {
				route(handle, pathname, response, JSON.parse(postData));
			});

		}
		else if(request.method.toLowerCase() == 'get'){
			console.log("IN GET");
			var qs = url.parse(request.url).query;
			route(handle, pathname, response, qs);
		}

		
	}

	http.createServer(onRequest).listen(process.env.PORT || 3000);
	console.log("Server has started.");

}
exports.start = start;
