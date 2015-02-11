'use strict';

var config = require('../local.env');

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/fuir-dev'
  },

  seedDB: true,

  twilio: {
    sid: config.twilio.sid,
    auth: config.twilio.auth
  }
};
