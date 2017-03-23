var pgHelper = require('pg-cli');

var pgConf = {
  user: 'postgres',
  database: 'test',
  password: '123456',
  host: 'localhost',
  port: 5432,
  max: 10, // max number of clients in pool
  min: 4,
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

pgHelper.initPool(pgConf);


var cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Charset',
  'Access-Control-Allow-Methods': 'HEAD,PUT,POST,GET,DELETE,OPTIONS',
  'X-Powered-By': 'zzk-simple-server[nodeJS]'
};

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
          var { tip } = JSON.parse(requestBody);
          pgHelper.insert('tips', { title: tip.title, content: tip.content }, (err, reply) => {
            pgHelper.select('tips', { id: { '$gt': 0 } }, [], (err, reply) => {
              res.end(JSON.stringify({ data: reply.rows }));
            });
          });
        }
        break;
      case '/edit-tip':
        if (requestBody) {
          var { tip } = JSON.parse(requestBody);
          pgHelper.update('tips', { id: tip.id }, { content: tip.content, title: tip.title }, (err, reply) => {
            pgHelper.select('tips', { id: { '$gt': 0 } }, [], (err, reply) => {
              res.end(JSON.stringify({ data: reply.rows }));
            });
          });
        }
        break;
      case '/delete-tips':
        if (requestBody) {
          var deleteTips = JSON.parse(requestBody);
          deleteTips.tips.map(tip => {
            pgHelper.remove('tips', { id: tip.id }, (err, reply) => {
              pgHelper.select('tips', { id: { '$gt': 0 } }, [], (err, reply) => {
                res.end(JSON.stringify({ data: reply.rows }));
              });
            });
          });
        }
        break;
      case '/get-tips':
        pgHelper.select('tips', { id: { '$gt': 0 } }, [], (err, reply) => {
          res.end(JSON.stringify({ data: reply.rows }));
        });
        break;
      case '/getAnalysisData':
        if (requestBody) {
          var request = JSON.parse(requestBody);
          var size = requestBody.size | 10;
          //通过$1进行占位，query第二个参数为SqlParameter
          var sql = 'SELECT * FROM analysis_data WHERE id > (SELECT MAX(id) FROM analysis_data) - $1';
          pgHelper.query(sql, [size * 4], (err, reply) => {
            var rows = reply.rows || [];
            var names = [];
            rows.map(function (item) {
              if (names.indexOf(item.name) < 0) names.push(item.name);
            });
            var result = names.map(function (name) {
              models = [];
              rows.forEach(function (row) {
                if (row.name == name) {
                  models.push(row);
                }
              })
              return { name: name, values: models }
            });
            res.end(JSON.stringify({ data: result }));
          });
        }
        break;
      case '/addAnalysisData':
        if (requestBody) {
          var request = JSON.parse(requestBody) || [];
          pgHelper.insertBatch('analysis_data', request, (err, reply) => {
            res.end(JSON.stringify({ data: reply.rows }));
          });
        }
        break;
      default:
        res.writeHead(404);
        res.end();
    }
  })


}).listen(4000, () => {
  console.log('server running at port:4000');
});