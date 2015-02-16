'use strict';

angular.module('fuirApp')
  .factory('Question', function ($http, ParseUser, $q) {

    var _questions = [];

    return {
      getQuestions: function () {
        var deferred = $q.defer();

        var page = Math.ceil((_questions.length / 30)) + 1;

        $http.get('/api/questions/'+page)
        .success(function(questions) {
          questions.forEach(function(question) {
            _questions.push(question);
          });

          deferred.resolve(_questions);
        })
        .error(function(err) {
          deferred.reject(err);
        });

        // if(_questions.length === 0) {
        //   if(Parse.User.current()) {
        //     Parse.Cloud.run('GetUnansweredQuestions', {userId: Parse.User.current().id}, {
        //       success: function(results) {
        //         _questions = results
        //         deferred.resolve(_questions);
        //       },
        //       error: function(error) {
        //         deferred.reject(error);
        //       }
        //     });
        //   }
        //   else {
        //     Parse.Cloud.run('GetTopQuesions', {dayRange:'0'}, {
        //       success: function(results) {
        //         _questions = results
        //         deferred.resolve(_questions);
        //       },
        //       error: function(error) {
        //         deferred.reject(error);
        //       }
        //     });
        //   }
        // }
        // else {
        //   deferred.resolve(_questions);
        // }


        return deferred.promise;
      },

      getQuestion: function(questionId) {

        var deferred = $q.defer();

        $http.get('/api/questions/byId/'+questionId)
        .success(function(question) {
          deferred.resolve(question);
        })
        .error(function(err) {
          deferred.reject(err);
        });

        return deferred.promise;
      },

      saveAnswer: function (questionId, answerIndex) {
        var deferred = $q.defer(),
            Answer = Parse.Object.extend('Answer'),
            answer = new Answer();

        // Get question answered
        this.getQuestion(questionId)
        .then(function(question) {
          var countAnswer1 = question.get('countAnswer1'),
              countAnswer2 = question.get('countAnswer2');

          // Calculate if in majority
          var inMajority = true;
          if(answerIndex === 0) {
            countAnswer1++;
            if(countAnswer1 < countAnswer2) {
              inMajority = false;
            }
          }
          else if(answerIndex === 1) {
            countAnswer2++;
            if(countAnswer2 < countAnswer1) {
              inMajority = false;
            }
          }

          // Save Answer in parse
          answer.save({
            choiceIndex: answerIndex,
            question: question,
            user: ParseUser.getCurrentUser(),
            inMajority: inMajority
          }, {
            success: function(newAnswer) {
              deferred.resolve(newAnswer);
            },
            error: function(newAnswer, error) {
              deferred.reject(error);
            }
          });
        })
        .catch(function(err) {
          deferred.reject(err);
        });

        return deferred.promise;
      }
    };
  });
