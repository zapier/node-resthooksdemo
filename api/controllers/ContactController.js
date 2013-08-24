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
    if (req.method =='POST') {
      Contact.create(req.body).done(function(err, contact) {
        res.redirect('/');
      });
    } else {
      res.view({
        fields: _.pairs(Contact.attributes),
        capitalize: function(str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
      });
    }

  },


  /**
   * /contact/list
   */ 
  list: function (req,res) {

    // This will render the view: 
    // /Users/jamescarr/Projects/resthooks-project/views/contact/list.ejs
    Contact.find().done(function(err, contacts) {
      res.view({contacts: contacts});
    });
  },


  /**
   * /contact/destroy
   */ 
  destroy: function (req,res) {

    // This will render the view: 
    // /Users/jamescarr/Projects/resthooks-project/views/contact/destroy.ejs
    res.view();

  },


  /**
   * /contact/edit
   */ 
  edit: function (req,res) {

    // This will render the view: 
    // /Users/jamescarr/Projects/resthooks-project/views/contact/edit.ejs
    res.view();

  }

};
