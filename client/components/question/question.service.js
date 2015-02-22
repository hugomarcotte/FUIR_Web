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
        var deferred = $q.defer();

        $http.post('/api/answers/'+questionId, {answerIndex: answerIndex})
          .success(function(question) {
            deferred.resolve(question);
          })
          .error(function(err) {
            deferred.reject(err);
          });

        return deferred.promise;
      }
    };
  });
