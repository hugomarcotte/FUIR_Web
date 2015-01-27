'use strict';

var express = require('express');
var controller = require('./sms.controller');

var router = express.Router();

router.post('/', controller.sendAppLink);
router.post('/questionOfTheDay', controller.questionVote);
router.post('/sendQuestionOfTheDay', controller.sendQuestionOfTheDay);

module.exports = router;
