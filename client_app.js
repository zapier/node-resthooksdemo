
/**
 * Module dependencies.
 */

var http = require('http')
  , express = require('express')
  , request = require('request');

var app = express()
  , ACTIONS = ['create', 'update', 'delete']
  , subscriptions = [];

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.errorHandler());


ACTIONS.forEach(function(action) {
  app.post('/' + action, function(req, res) {
    console.log(action);
    console.log(req.body);
    res.send(200);
  });
});

app.get('/remove-subscriptions', function(req, res) {
  subscriptions.forEach(function(sub) {
    console.log('deleting subscription ' + sub);
    request.del('http://localhost:1337/subscription/'+sub)
    res.send(204);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  ACTIONS.forEach(function(action) { create_subscription('contact.' + action); });
});


function create_subscription(event) {
  var parts = event.split('.')
  request.post({
    url: 'http://localhost:1337/subscription',
    json: {
      target: 'http://localhost:'+app.get('port')+'/'+parts[1],
      event: event
    }
  }, function(err, result, json) {
    if (err && err.code == 'ECONNREFUSED') {
      console.log('Service app isn\'t running. Start it first via `sails lift &`');
      process.exit(); 
    } else {
      console.log("Subscription created for " + event);
      subscriptions.push(json.id);
    }
  });
}
