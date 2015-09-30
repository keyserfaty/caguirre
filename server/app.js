var request = require('request'),
	$ = require('cheerio'),
	Q = require('q'),
	_ = require('underscore');

var url = 'http://www.lanacion.com.ar/autor/carolina-aguirre-309';


var readHTML = function (path) {
	var q = Q.defer();

	request(path, function (err, res, body) {
		if (err) return q.reject(err);
		return q.resolve(body);
	});

	return q.promise;
}

// var $ = cheerio.load(readHTML(url).then(function (result) {
// 	return result;
// }));

request(url, function (err, res, body) {
	if (err) return err;

	var htmlThing = $.load(body);
	
	console.log(htmlThing('h2').text());
		
});
