let express = require('express');

let port = 8080;

let app = express();

if (app.get('env') === 'test') {
  port = 8081;
}

app.use(express.static(__dirname));
app.get('/', function(req, res) {
  res.sendfile('index.html', {root: __dirname });
});

// run app
app.set('port', process.env.PORT || port);

let server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + server.address().port);
});

module.exports = app;
