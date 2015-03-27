'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Parse = require('parse').Parse;

Parse.initialize(config.parse.appId, config.parse.jsKey);


// Save a new answer
exports.create = function(req, res) {

  var Question = Parse.Object.extend('Question'),
      query = new Parse.Query(Question);

  // Get question
  query.get(req.params.qId, {
    success: function(question) {
      var Answer = Parse.Object.extend('Answer'),
          answer = new Answer();

      var countAnswer1 = question.get('countAnswer1'),
          countAnswer2 = question.get('countAnswer2');

      // Calculate if in majority
      var inMajority = true;
      if(req.body.answerIndex === 0) {
        countAnswer1++;
        if(countAnswer1 < countAnswer2) {
          inMajority = false;
        }
      }
      else if(req.body.answerIndex === 1) {
        countAnswer2++;
        if(countAnswer2 < countAnswer1) {
          inMajority = false;
        }
      }

      // Save Answer in parse
      answer.save({
        choiceIndex: req.body.answerIndex,
        question: question,
        user: null,
        inMajority: inMajority
      }, {
        success: function(newAnswer) {
          res.json(200, newAnswer);
        },
        error: function(newAnswer, error) {
          console.log('Couldnt save answer.');
          console.log(error);
          return res.send(500, 'Answer couldnt be saved');
        }
      });

    },
    error: function(error) {
      console.log('Couldnt save answer because question was not found.')
      console.log(error);
      return res.send(500, 'Answer couldnt be saved');
    }
  });

};
