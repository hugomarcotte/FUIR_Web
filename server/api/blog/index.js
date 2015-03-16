'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.redirect(301, 'http://fuirblog.herokuapp.com/?feed=podcast')
});

module.exports = router;
