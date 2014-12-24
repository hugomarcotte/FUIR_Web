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
      else if(qIndex % 3 === 1) { return 'greyCard'; }
      else if(qIndex % 3 === 2) { return 'darkOrangeCard'; }
      //else if(qIndex % 4 === 3) { return 'redCard'; }
    };

    $scope.getRandomGuy = function(cardColor) {

      var num = Math.floor(Math.random() * 8) + 1,
          color;

      if (cardColor === 'orangeCard') { color = 'red'; }
      else if(cardColor === 'greyCard') { color = 'darkorange'; }
      else if(cardColor === 'darkOrangeCard') { color = 'orange'; }

      return 'assets/images/dude_'+num+'_'+color+'.png'
    };

    $scope.showCard = function (question, qIndex) {
      var cardColorClass = 'big'+ $scope.getCardColor(qIndex);
      ngDialog.open({
        template: 'questionTemplate',
        controller: 'QuestionCtrl',
        data: {question: question, randomGuy: $scope.getRandomGuy($scope.getCardColor(qIndex))},
        className: 'ngdialog-theme-default '+cardColorClass
      });
    };

    $scope.filterQuestions = function(question) {
      return $scope.questions.indexOf(question) === $scope.questionIndex;
    };


});
