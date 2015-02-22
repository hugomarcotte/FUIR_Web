'use strict';

var express = require('express');
var controller = require('./answer.controller');

var router = express.Router();

router.post('/:qId', controller.create);

module.exports = router;
