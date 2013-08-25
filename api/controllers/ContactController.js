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
        res.status(201);
        viewDetails['contact'] = contact.toJSON();
        redirectIfWebRequest(req, res);
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
    // in reality we'd use more care here. 
    Contact.findOne(req.param('id')).done(function(err, contact){
      contact.destroy(function(){
        res.status(204);
        redirectIfWebRequest(req, res);
      });
    });

  },


  /**
   * /contact/edit
   */ 
  edit: function (req,res) {
    Contact.findOne(req.param('id')).done(function(err, contact) {
      if (req.method =='POST') {
        _.pairs(req.body).forEach(function(pair) {
          var key = pair[0], value = pair[1];
          if(key != 'id') {
            contact[key] = value;
          }
        });

        contact.save(function(err) {
          redirectIfWebRequest(req, res);
        });

      } else {
        viewDetails.contact = contact
        res.view(viewDetails);
      }
    });
  }

};

// some utilities that probably don't belong here
var viewDetails = {
  fields: _.pairs(Contact.attributes),
  capitalize: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

function redirectIfWebRequest(req, res) {
  if (req.accepts('text/html')) {
    res.redirect('/');
  } else {
    res.view(viewDetails);
  }
}
