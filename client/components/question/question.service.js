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

        return $http.post('/api/answers/'+questionId, {answerIndex: answerIndex})
      }
    };
  });
