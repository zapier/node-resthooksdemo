
/**
 * Module dependencies.
 */

var http = require('http')
  , express = require('express')
  , request = require('request');

var app = express()
  , subscriptions = [];

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.errorHandler());

var handler = function(type) {
  return function(req, res) {
    console.log(type);
    console.log(req.body);
  }
};

app.post('/create', handler("create"));
app.post('/update', handler("update"));
app.post('/delete', handler("delete"));
app.get('/remove-subscriptions', function() {
  subscriptions.forEach(function(sub) {
    console.log('deleting subscription ' + sub);
    request.del('http://localhost:1337/subscription/'+sub)
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  create_subscription('contact.create');
  create_subscription('contact.update');
  create_subscription('contact.delete');
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
