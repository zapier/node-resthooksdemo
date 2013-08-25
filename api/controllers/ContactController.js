Contact = require(__dirname+'/../models/Contact')
_ = require('underscore')

/**
 * ContactController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  
  /**
   * /contact/create
   */ 
  create: function (req,res) {
    var viewDetails = {
      fields: _.pairs(Contact.attributes),
      capitalize: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    };

    if (req.method =='POST') {
      Contact.create(req.body).done(function(err, contact) {
        res.status(204);
        viewDetails['contact'] = contact.toJSON();
        console.log(req.accepts('text/html'));
        if (req.accepts('text/html')) {
          res.redirect('/');
        } else {
          res.view(viewDetails);
        }
      });
    } else {
      res.view(viewDetails);
    }

  },


  /**
   * /contact/list
   */ 
  list: function (req,res) {
    Contact.find().done(function(err, contacts) {
      res.view({contacts: contacts});
    });
  },


  /**
   * /contact/destroy
   */ 
  destroy: function (req,res) {
    res.view();

  },


  /**
   * /contact/edit
   */ 
  edit: function (req,res) {
    res.view();

  }

};

