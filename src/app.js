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

readHTML(url)
  .then(res => {
    const $ = cheerio.load(res);
    console.log($('h1').text())
  })
