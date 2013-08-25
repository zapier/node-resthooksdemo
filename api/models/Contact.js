var hooks = require('./../services/SubscriptionNotifier');
/**
 * Contact
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */


var Contact = {
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
  }
};

hooks.decorate(Contact);
module.exports = Contact;
