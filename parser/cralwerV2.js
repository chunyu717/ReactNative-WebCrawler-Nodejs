const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// var http = require('http');
// app.use(express.static('static'));
// var server = http.createServer(app);
// server.listen(80, '0.0.0.0', function() {
//   console.log('server run at http://127.0.0.1:80/ ');
// });

var http = require('https');
app.use(express.static('static'));
const fs = require('fs');
var privateKey = fs.readFileSync(__dirname + '/ssl/private.key');
var certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt');
var credentials = {
  key: privateKey,
  cert: certificate,
  requestCert: true,
  rejectUnauthorized: false,
};
var server = http.createServer(credentials, app);
server.listen(443, '0.0.0.0', function() {
  console.log('server run at http://127.0.0.1:443/ ');
});

const phantom = require('phantom'); // import module

app.get('/api/listEvent', cors(), function(request, response) {
  console.log('listEvent');
  earthquake2(function(result) {
    console.log('result ', result);
    return response.status(200).json({
      success: true,
      message: result,
    });
  });
});

async function earthquake2(callback) {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {});

  const status = await page.open('https://www.mainpi.com/query?i=587');
  var result = await page.evaluate(function() {
    var count = 1;
    return $('.callnum_display.center-block')
      .map(function() {
        return {
          index: count++,
          title: $(this)
            .find('span')
            .text(),
        };
      })
      .toArray();
  });
  console.log(new Date());
  console.log(result);
  //console.log(JSON.stringify(result));
  //console.log('result[0].title = ', result[0].title);

  await instance.exit();

  callback(result);
}
