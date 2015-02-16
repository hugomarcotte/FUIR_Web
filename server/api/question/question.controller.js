'use strict';

var _ = require('lodash');
var Parse = require('parse').Parse;

Parse.initialize('DJnfc0KsF8WRF0K2lr25mVm95Uzg0xnUAG72axAX', 'NTxalrgpCfGdeMwIVQ8r2budaoApAWpITreGfH10');


// Get list of questions
exports.getQuestionList = function(req, res) {

  Parse.Cloud.run('GetTopQuesions', {dayRange:'0', page:req.params.page}, {
    success: function(questions) {
      res.json(200, questions)
    },
    error: function(error) {
      return handleError(res, error);
    }
  });

};

// Get question by id
exports.getQuestion = function(req, res) {
  var Question = Parse.Object.extend('Question'),
      query = new Parse.Query(Question);

  query.get(req.params.id, {
    success: function(question) {
      res.json(200, question)
    },
    error: function(object, error) {
      return handleError(res, error);
    }
  });
};
