var request = require('request')

module.exports = {
  notify: function(event, item, next) {
    var Subscription = sails.models.subscription;
    Subscription.find({event:event}).done(function(err, subscriptions) {
      subscriptions.forEach(function(s) {
        request.post({
          url: s.url,
          json: item
        }, function(err, result, json){
          console.log("SENT " + event + " TO " + s.url);
          if (next) next(err, json);
        })
      });
    });
  }
}
