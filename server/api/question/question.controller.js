'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse/node');

Parse.initialize(config.parse.appId);
Parse.serverURL = 'https://fuimrightserver.herokuapp.com/parse';

// Get list of questions
exports.getQuestionList = function(req, res) {
  Parse.Cloud.run('GetTopQuesions', {dayRange:'0', page:req.params.page}, {
    success: function(questions) {
      res.json(200, questions);
    },
    error: function(question, error) {
      console.log('Coudnt get question list.');
      console.log(error);
      return res.send(404, 'Questions not found');
    }
  });
};

// Get question by id
exports.getQuestion = function(req, res) {
  var Question = Parse.Object.extend('Question'),
      query = new Parse.Query(Question);

  query.get(req.params.id, {
    success: function(question) {
      res.json(200, question);
    },
    error: function(question, error) {
      console.log('Couldnt retrieve question: '+req.params.id);
      console.log(error);

      return res.send(404, 'Question not found');
    }
  });
};
