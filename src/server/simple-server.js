var cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Charset',
  'Access-Control-Allow-Methods': 'HEAD,PUT,POST,GET,DELETE,OPTIONS',
  'X-Powered-By': 'zzk-simple-server[nodeJS]'
};

var users = [
  { id: 1, name: 'tip1', password: 'babagbabalalbal', createTime: '2016-02-22' }
];

var tips = [
  { id: 1, title: 'tip1', content: 'abc' },
  { id: 2, title: 'tip2', content: 'def' },
  { id: 3, title: 'tip3', content: 'ghi' }
];

require('http').createServer((req, res) => {
  var url = req.url;
  res.writeHead(200, cors);
  console.log('receive data from url:' + url);

  var requestBody = '';
  req.on('data', (chunk) => requestBody += chunk);
  req.on('end', () => {
    console.log('this is post data: ' + requestBody);
    switch (url) {
      case '/save-tip':
        if (requestBody) {
          var {tip} = JSON.parse(requestBody);
          var id = 1;
          if (tips.length > 0) {
            id = tips[tips.length - 1].id + 1
          }
          tips.push({ id, title: tip.title, content: tip.content });
          res.end(JSON.stringify({ data: tips }));
        }
        break;
      case '/edit-tip':
        if (requestBody) {
          var {tip} = JSON.parse(requestBody);
          var id = 1;
          tips = tips.map(item => {
            if (item.id == tip.id) {
              return tip
            }
            else {
              return item
            }
          });
          res.end(JSON.stringify({ data: tips }));
        }
        break;
      case '/delete-tips':
        if (requestBody) {
          var deleteTips = JSON.parse(requestBody);
          deleteTips.tips.map(tip => {
            var idx = tips.findIndex(tip);
            if (idx >= 0) {
              tips.splice(idx, 1);
            }
          })
          res.end(JSON.stringify({ data: tips }));
        }
        break;
      case '/get-tips':
        res.end(JSON.stringify({ data: tips }));
        break;
      case '/get-users':
        res.end(JSON.stringify({ data: users }));
        break;
      default:
        res.writeHead(404);
        res.end();
    }
  })


}).listen(4000, () => {
  console.log('server running at port:4000');
});

Array.prototype.findIndex = function (obj) {
  for (var i = 0, imax = this.length; i < imax; i++) {
    var ectypeObj = this[i];
    var ectypeObjLength = 0, successLength = 0;
    for (var k in ectypeObj) {
      ectypeObjLength += 1;
      if (ectypeObj[k] === obj[k]) {
        successLength += 1;
      }
    }
    if (ectypeObjLength === successLength) {
      return i;
    }
  }
  return -1;
}