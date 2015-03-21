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

        return $http.get('/api/questions/byId/'+questionId);

      },

      saveAnswer: function (questionId, answerIndex) {

        return $http.post('/api/answers/'+questionId, {answerIndex: answerIndex});
      }
    };
  });
