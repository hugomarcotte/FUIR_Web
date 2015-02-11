'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
//Initialize a REST client in a single line:
var client = require('twilio')(config.twilio.sid, config.twilio.auth);

// Send the link to the app
exports.sendAppLink = function(req, res) {

  client.sendSms({
    to:req.body.phone,
    from:'+16505607298',
    body:'Tap the link to download F.U. I\'m right: bit.ly/1rBoRu7'
  }, function(error, message) {
    if (!error) {
      return res.json(201, {msgID: message.sid, creationDate: message.dateCreated});
    } else {
      console.log('Oops! There was an error: ' +error);
    }
  });
};
