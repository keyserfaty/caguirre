import request from 'request';
import cheerio from 'cheerio';

const url = 'http://www.lanacion.com.ar/autor/carolina-aguirre-309';

const readHTML = path =>
  new Promise((resolve, reject) => {
    request(path, function (err, res, body) {
      if (err) return reject(err);
      return resolve(body);
    });
  });

const html = cheerio.load(readHTML(url).then(function (result) {
	return result;
}));

request(url, function (err, res, body) {
	if (err) return err;

	var htmlThing = html.load(body);

	console.log(htmlThing('h2').text());

});
