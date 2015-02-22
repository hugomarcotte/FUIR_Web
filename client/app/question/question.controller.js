'use strict';

angular.module('fuirApp')
  .controller('QuestionCtrl', function ($scope, Question) {


    $scope.question = $scope.ngDialogData.question;
    //$scope.randomGuy = $scope.ngDialogData.randomGuy;
    $scope.randomGuyNumber = $scope.ngDialogData.randomGuyNumber;
    $scope.cardColor = $scope.ngDialogData.cardColor;


    $scope.getRandomGuy = function(num, color) {

      if(num === $scope.randomGuyNumber && $scope.cardColor === 'orangeCard' && color === 'red') {
        return true;
      }
      else if(num === $scope.randomGuyNumber && $scope.cardColor === 'greyCard' && color === 'darkorange') {
        return true;
      }
      else if(num === $scope.randomGuyNumber && $scope.cardColor === 'darkOrangeCard' && color === 'orange') {
        return true;
      }
      else if(num === $scope.randomGuyNumber && $scope.cardColor === 'redCard' && color === 'grey') {
        return true;
      }

      return false;
    };

    $scope.saveAnswer = function(answerIndex) {

      // console.log('saving');
      // Question.getQuestion($scope.question.id)
      // .then(function(question){
      //
      //   // Add results to question in scope
      //   $scope.question.results = {
      //     inMajority: true,
      //     percentAnsw1: 60,
      //     percentAnsw2: 40,
      //     totalAnswerCount: 400
      //   };
      //
      //   $scope.question.answered = true;
      //
      // })
      // .catch(function(err){
      //   console.log(err);
      // });

      // Save answer
      Question.saveAnswer($scope.question.objectId, answerIndex)
      .then(function(newAnswer){

        // Get question with new count values
        Question.getQuestion($scope.question.objectId)
        .then(function(question){

          // Add results to question in scope
          $scope.question.results = {
                inMajority: newAnswer.inMajority,
                percentAnsw1: Math.ceil((question.countAnswer1 / question.totalAnswerCount) * 100),
                percentAnsw2: Math.floor((question.countAnswer2 / question.totalAnswerCount) * 100),
                totalAnswerCount: question.totalAnswerCount
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
