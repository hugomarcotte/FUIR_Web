'use strict';

angular.module('fuirApp')
  .factory('Question', function ($http, ParseUser, $q) {

    return {
      getQuestions: function () {

        var deferred = $q.defer();
         if(Parse.User.current()) {
           Parse.Cloud.run('GetUnansweredQuestions', {userId: Parse.User.current().id}, {
             success: function(results) {
               console.log('showing unanswered');
               deferred.resolve(results);
             },
             error: function(error) {
               deferred.reject(error);
             }
           });
         }
         else {
           Parse.Cloud.run('GetTopQuesions', {dayRange:"60"}, {
             success: function(results) {
               console.log('showing top questions');
               deferred.resolve(results);
             },
             error: function(error) {
               deferred.reject(error);
             }
           });
         }

         return deferred.promise;
      },

      getQuestion: function(questionId) {
        var deferred = $q.defer(),
            Question = Parse.Object.extend('Question'),
            query = new Parse.Query(Question);

        query.get(questionId, {
          success: function(question) {
            deferred.resolve(question);
          },
          error: function(object, error) {
            deferred.reject(error);
          }
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
