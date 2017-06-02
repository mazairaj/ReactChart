var express = require('express');
var webpack = require('webpack');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path')
var webpackMiddleware = require("webpack-dev-middleware");
var config = require('./webpack.config');
var got = require('got');

var api = require('./routes/api');

// Make sure we have all required env vars. If these are missing it can lead
// to confusing, unpredictable errors later.


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var compiler = webpack(config);
app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})


app.get('/', function(req, res) {
  res.redirect('index.html');
});

app.post('/getMetrics', function(req, res){

  got(req.body.url)
    .then((resp) => {


      var metrics = JSON.parse(JSON.stringify(resp.body.substring(14, resp.body.length-1)));
      metrics = JSON.parse(metrics);
      console.log(metrics)
      res.json({data:metrics})
    })
    .catch((err) => {
      console.error('Error', err);
    });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send("Error: " + err.message + "\n" + err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("Error: " + err.message);
});

var server = require('http').Server(app);
var port = 3000;
server.listen(port, function() {
  console.log('Started, listening on port ', port);
});
