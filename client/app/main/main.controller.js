'use strict';

angular.module('fuirApp')
  .controller('MainCtrl', function ($scope, $http, ParseUser, Question) {
    $scope.isLoggedIn = ParseUser.isLoggedIn;
    $scope.questionIndex = 1;

    if($scope.isLoggedIn()) {

      Question.getQuestions()
      .then(function(questions){
        $scope.questions = questions;
      })
      .catch(function(err) {
        console.log('Cannot get questions: ' +err);
      });
    }

    $scope.filterQuestions = function(question) {
      return $scope.questions.indexOf(question) === $scope.questionIndex;
    };

    $scope.saveAnswer = function(questionId, answerIndex) {

      // Save answer
      Question.saveAnswer(questionId, answerIndex)
      .then(function(newAnswer){

        // Get question with new count values
        Question.getQuestion(questionId)
        .then(function(question){

          // // Add results to question in scope
          $scope.questions.forEach(function(elem) {
            if(elem.id === question.id) {
              elem.results = {
                inMajority: newAnswer.get('inMajority'),
                percentAnsw1: Math.ceil((question.get('countAnswer1') / question.get('totalAnswerCount')) * 100),
                percentAnsw2: Math.floor((question.get('countAnswer2') / question.get('totalAnswerCount')) * 100)
              };
            }
          });

        })
        .catch(function(err){
          console.log(err);
        });
      })
      .catch(function(err){
        console.log(err);
      });

    };
});
