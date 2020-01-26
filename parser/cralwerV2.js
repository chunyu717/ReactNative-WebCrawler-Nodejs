const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var http = require('http');
app.use(express.static('static'));
var server = http.createServer(app);
server.listen(80, '0.0.0.0', function() {
  console.log('server run at http://127.0.0.1:80/ ');
});

// var http = require('https');
// app.use(express.static('static'));
// const fs = require('fs');
// var privateKey = fs.readFileSync(__dirname + '/ssl/private.key');
// var certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt');
// var credentials = {
//   key: privateKey,
//   cert: certificate,
//   requestCert: true,
//   rejectUnauthorized: false,
// };
// var server = http.createServer(credentials, app);
// server.listen(443, '0.0.0.0', function() {
//   console.log('server run at http://127.0.0.1:443/ ');
// });

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
  // await解决回调问题，创建一个phantom实例
  const instance = await phantom.create();
  //通过phantom实例创建一个page对象，page对象可以理解成一个对页面发起请求和处理结果这一集合的对象
  const page = await instance.createPage();
  //页面指向的是哪个一个url
  await page.on('onResourceRequested', function(requestData) {
    //console.info('Requesting', requestData.url)
  });
  //得到打开该页面的状态码
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
    //})
  });
  console.log(new Date());
  console.log(result);
  console.log(JSON.stringify(result));
  console.log('result[0].title = ', result[0].title);

  // if (result[0].title === '17') {
  //   job.cancel();
  // }

  //输出内容
  //退出该phantom实例
  await instance.exit();

  //return result ;
  callback(result);
  //return { result[0].title , result[1].title , result[2].title }
}
