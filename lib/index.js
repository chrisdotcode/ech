#!/usr/bin/env node
'use strict';

var http        = require('http');
var url         = require('url');
var querystring = require('querystring');

var program = require('commander');

var opts = program
	.version(require('../package.json').version)
	.option('-p, --port', 'Specify port [default:8001]')
	.option('-h, --host', 'Specify host [default:\'0.0.0.0\']')
	.parse(process.argv);

function contains(needle, haystack) {
	return haystack.indexOf(needle) !== -1;
}

http.createServer(function(request, response) {
	var body = '';

	request.on('data', function(chunk) {
		body += chunk;
	});

	request.on('end', function() {
		var urlParts = url.parse(request.url, true);

		var contentType = (request.headers['content-type'] || '');

		if (contains('application/json', contentType)) {
			body = JSON.parse(body, null, '\t');
		} else if (contains('application/x-www-form-urlencoded', contentType)) {
			body = querystring.parse(body);
		}

		response.setHeader('Content-Type', 'application/json');
		response.end(JSON.stringify({
			fullUrl: urlParts.href,
			url: urlParts.pathname,
			fullQuery: urlParts.search,
			query: urlParts.query,
			ip: request.connection.remoteAddress,
			method: request.method,
			headers: request.headers,
			body: body,
		}, null, '\t'));
	});

}).listen(opts.port = 8001, opts.host = '0.0.0.0', function() {
	console.log('Server listening on "http://' + opts.host + ':' + opts.port + '".');
});
