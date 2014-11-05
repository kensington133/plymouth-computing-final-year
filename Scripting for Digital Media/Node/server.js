	var http = require('http');
	var url = require("url");

	console.log("server running...");

	http.createServer(function (req, res) {
		console.log('request received');

			var _get = url.parse(req.url, true).query;
			console.log(_get);
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('_testcb(\''+_get['data']+'\')');

	}).listen(8080);