var request = require('request')

module.exports = {
  notify: function(event, item, next) {
    var Subscription = sails.models.subscription;
    Subscription.find({event:event}).done(function(err, subscriptions) {
      subscriptions.forEach(function(s) {
        request.post({
          url: s.target,
          json: item
        }, function(err, result, json){
          console.log("SENT " + event + " TO " + s.target);
          if (next) next(err, json);
        })
      });
    });
  }
}
