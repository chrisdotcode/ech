#!/usr/bin/env node
'use strict';

var http        = require('http');
var url         = require('url');

var port = process.argv[2] || 8001;

http.createServer(function(request, response) {
	var body = '';

	request.on('data', function(chunk) {
		body += chunk;
	});

	request.on('end', function() {
		var urlParts = url.parse(request.url, true);

		response.setHeader('Content-Type', 'application/json');
		response.end(JSON.stringify({
			fullUrl: urlParts.href,
			url: urlParts.pathname,
			fullQuery: urlParts.search,
			query: urlParts.query,
			ip: request.connection.remoteAddress,
			method: request.method,
			headers: request.headers,
			body: body.toString(),
		}, null, '\t'));
	});

}).listen(port, '0.0.0.0', function() {
	console.log('Server listening on :' + port + '.');
});
