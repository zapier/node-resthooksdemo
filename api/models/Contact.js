var SubscriptionNotifier = require('./../services/SubscriptionNotifier');
var _ = require('underscore');
/**
 * Contact
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
    firstName: {
      type: 'STRING',
      defaultsTo: 'Jeffery'
    },
    lastName: {
      type: 'STRING',
      defaultsTo: 'Lebowski'
    },
    phoneNumber: {
      type: 'STRING',
      defaultsTo: '111-222-3333'
    },
    emailAddress: {
      type: 'email', // Email type will get validated by the ORM
      required: true,
      defaultsTo: 'thedude@example.com'
    },
  },

  
  // lifecycle callbacks
  afterCreate: function(item, next) {
    next(null, item);
    SubscriptionNotifier.notify('contact.create', item);
  },
  afterUpdate: function(item, next) {
    next(null, item);
    SubscriptionNotifier.notify('contact.update', item);
  },
  afterDestroy: function(next) {
    next();
    SubscriptionNotifier.notify('contact.delete', {});
  }

};
