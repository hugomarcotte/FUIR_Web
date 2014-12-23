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
      if (qIndex % 4 === 0) { return 'orangeCard'; }
      else if(qIndex % 4 === 1) { return 'redCard'; }
      else if(qIndex % 4 === 2) { return 'darkOrangeCard'; }
      else if(qIndex % 4 === 3) { return 'greyCard'; }
    };

    $scope.showCard = function (question, qIndex) {
      var cardColorClass = 'big'+ $scope.getCardColor(qIndex);
      ngDialog.open({
        template: 'questionTemplate',
        controller: 'QuestionCtrl',
        data: {question: question},
        className: 'ngdialog-theme-default '+cardColorClass
      });
    };

    $scope.filterQuestions = function(question) {
      return $scope.questions.indexOf(question) === $scope.questionIndex;
    };


});
