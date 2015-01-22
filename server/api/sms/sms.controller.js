'use strict';

var _ = require('lodash');
//Initialize a REST client in a single line:
var client = require('twilio')('ACddb7cf71a16f6614f602cf37ce7be47b', '7558ae02a335d1dc5b2764d0641de24e');

// Send the link to the app
exports.sendAppLink = function(req, res) {
  console.log(req.body);

  client.sendSms({
    to:'4158890233',
    from:'+16505607298',
    body:'Tap the link to download F.U. I\'m right: https://itunes.apple.com/app/id920877615?mt=8'
  }, function(error, message) {
    if (!error) {
      return res.json(201, {msgID: message.sid, creationDate: message.dateCreated});
    } else {
      console.log('Oops! There was an error: ' +error);
    }
  });
};
