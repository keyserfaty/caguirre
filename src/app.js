import request from 'request';
import cheerio from 'cheerio';
import jsonfile from 'jsonfile';

const url = 'http://www.lanacion.com.ar';

const readHTML = path =>
  new Promise((resolve, reject) => {
    request(path, function (err, res, body) {
      if (err) return reject(err);
      return resolve(body);
    });
  });

const list = [
  '/1957588-colombia',
  '/1953450-todo-lo-del-deporte-me-da-envidia',
  '/1948953-bambi-y-yo',
  '/1945116-la-pelicula-de-los-otros',
  '/1940776-construir-una-historia-de-amor',
  '/1936353-dialogos-ajenos',
  '/1931973-la-formula-segura',
  '/1927670-un-mundo-sin-gandalfs',
  '/1923061-mi-yo-de-ficcion',
  '/1914587-el-bidon-de-agua',
  '/1900912-escribir-una-tortura-que-nunca-quiero-dejar',
  '/1896283-primeros-amores-primeras-escenas',
  '/1882330-como-en-las-mejores-familias',
  '/1875161-el-ano-en-que-no-pude-escribir',
  '/1855571-la-ultima-escena',
  '/1847415-como-novias-estupidas',
  '/1843421-la-chica-mas-linda-del-mundo',
  '/1839236-si-yo-mate-a-pedro'
];

list.forEach(path => {
  readHTML(url + path)
    .then(res => {
      const $ = cheerio.load(res);
      //* Single post
      const title = $('h1', '#nota').text();
      const subtitle = $('.bajada', '#nota').text();
      const content = [];
      $('#cuerpo', '#nota').find('p').each(function() {
        if ($(this).text().length) {
          content.push($(this).text())
        }
      });

      const post = {
        fileName: path,
        title,
        subtitle,
        content
      };

      const file = 'api' + path + '.json';
      jsonfile.writeFile(file, post, {spaces: 2}, (err) => {
        console.log('error ', err)
      });
    });

});


  //   //* List of posts
  //   const listOfUrls = [];
  //   const url = $('#mosaico-acu');
  //
  //   Object.keys(url.children().children()).map(single => {
  //     url.children().children()[single].children.map(elem => {
  //       if (elem.hasOwnProperty('name') && elem.name === 'a') {
  //         console.log(elem.attribs.href)
  //         listOfUrls.push(elem.attribs.href);
  //       }
  //     })
  //   });
  //
  //   console.log(listOfUrls)
  // });
