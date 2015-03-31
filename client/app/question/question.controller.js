'use strict';

angular.module('fuirApp')
  .controller('QuestionCtrl', function ($scope, Question) {
    var questionAnswered = false;
    $scope.showResult = false;

    $scope.question = $scope.ngDialogData.question;
    $scope.randomGuyNumber = $scope.ngDialogData.randomGuyNumber;
    $scope.cardColor = $scope.ngDialogData.cardColor;


    console.log($scope.question);

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

      if(!questionAnswered) {
        questionAnswered = true;


        // Question.getQuestion($scope.question.objectId)
        // .then(function(question){
        //
        //   // Add results to question in scope
        //   $scope.results = {
        //     inMajority: false,
        //     percentAnsw1: 100,
        //     percentAnsw2: 0,
        //     totalAnswerCount: 500
        //   };
        //
        // })
        // .catch(function(err){
        //   console.log(err);
        // });

        // To avoid delays in showing the result, calculate result on the front end and then save answer to Db
        $scope.results = {};
        $scope.question.totalAnswerCount += 1;

        if(answerIndex === 0) {
          $scope.question.countAnswer1 += 1;

          if($scope.question.countAnswer1 >= $scope.question.countAnswer2) {
            $scope.results.inMajority = true;
          }
          else {
            $scope.results.inMajority = false;
          }
        }
        else {
          $scope.question.countAnswer2 += 1;

          if($scope.question.countAnswer2 >= $scope.question.countAnswer1) {
            $scope.results.inMajority = true;
          }
          else {
            $scope.results.inMajority = false;
          }
        }

        // Add results to question in scope
        $scope.results.percentAnsw1 = Math.ceil(($scope.question.countAnswer1 / $scope.question.totalAnswerCount) * 100);
        $scope.results.percentAnsw2 = Math.floor(($scope.question.countAnswer2 / $scope.question.totalAnswerCount) * 100);
        $scope.results.totalAnswerCount = $scope.question.totalAnswerCount;

        $scope.showResult = true;

        // Save answer
        Question.saveAnswer($scope.question.objectId, answerIndex)
        .success(function(newAnswer) {
          console.log('Answer has been saved!')
        })
        .error(function(err) {
          console.log('Error: could\'nt save answer');
          console.log(err);
        });

      }

    };

  });
