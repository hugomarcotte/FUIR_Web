'use strict';

angular.module('fuirApp')
  .controller('QuestionCtrl', function ($scope, Question) {

    $scope.cardColor = $scope.ngDialogData.cardColor;
    $scope.question = $scope.ngDialogData.question;
    $scope.randomGuy = $scope.ngDialogData.randomGuy;

    console.log($scope.question);
    $scope.saveAnswer = function(answerIndex) {

      // Save answer
      Question.saveAnswer($scope.question.id, answerIndex)
      .then(function(newAnswer){

        // Get question with new count values
        Question.getQuestion($scope.question.id)
        .then(function(question){

          console.log('question');
          console.log(question);

          // Add results to question in scope
          $scope.question.results = {
                inMajority: newAnswer.get('inMajority'),
                percentAnsw1: Math.ceil((question.get('countAnswer1') / question.get('totalAnswerCount')) * 100),
                percentAnsw2: Math.floor((question.get('countAnswer2') / question.get('totalAnswerCount')) * 100)
          };

          $scope.question.answered = true;

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
