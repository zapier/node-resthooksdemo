var request = require('request')

var SubscriptionNotifier = {
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
  },

  decorate: function(model) {
    model.afterCreate = function(item, next) {
      next(null, item);
      SubscriptionNotifier.notify('contact.create', item);
    };

    model.afterUpdate = function(item, next) {
      next(null, item);
      SubscriptionNotifier.notify('contact.update', item);
    }

    model.afterDestroy = function(next) {
      next();
      SubscriptionNotifier.notify('contact.delete', {});
    }
  }
};

module.exports = SubscriptionNotifier;
