'use strict';

angular.module('fuirApp')
  .controller('MainCtrl', function ($scope, $http, ParseUser, Question, ngDialog) {
    $scope.questionIndex = 1;

    Question.getQuestions()
    .then(function(questions){
      $scope.questions = questions;
    })
    .catch(function(err) {
      console.log('Cannot get questions: ' +err);
    });

    $scope.getCardColor = function(qIndex) {
      if (qIndex % 3 === 0) { return 'orangeCard'; }
      else if(qIndex % 3 === 1) { return 'redCard'; }
      else if(qIndex % 3 === 2) { return 'greyCard'; }
    };

    $scope.showCard = function (question) {
      ngDialog.open({
        template: 'questionTemplate',
        controller: 'QuestionCtrl',
        data: {question: question}
      });
    };

    $scope.filterQuestions = function(question) {
      return $scope.questions.indexOf(question) === $scope.questionIndex;
    };


});
