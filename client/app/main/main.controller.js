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
      else if(qIndex % 4 === 1) { return 'greyCard'; }
      else if(qIndex % 4 === 2) { return 'darkOrangeCard'; }
      else if(qIndex % 4 === 3) { return 'redCard'; }
    };

    $scope.getRandomGuyNumber = function() {
      var num = Math.floor(Math.random() * 8) + 1;
      return num;
    };

    $scope.showCard = function (question, qIndex) {
      var cardColorClass = 'big'+ $scope.getCardColor(qIndex);
      ngDialog.open({
        template: 'questionTemplate',
        controller: 'QuestionCtrl',
        data: {question: question, randomGuyNumber: $scope.getRandomGuyNumber(), cardColor: $scope.getCardColor(qIndex)},
        className: 'ngdialog-theme-default '+cardColorClass
      });
    };

    $scope.filterQuestions = function(question) {
      return $scope.questions.indexOf(question) === $scope.questionIndex;
    };


});
