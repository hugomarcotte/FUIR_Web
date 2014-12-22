'use strict';

angular.module('fuirApp')
  .controller('QuestionCtrl', function ($scope, Question) {


    $scope.question = $scope.ngDialogData.question;

    $scope.getCardColor = function(qIndex) {
      if (qIndex % 3 === 0) { return 'orangeCard'; }
      else if(qIndex % 3 === 1) { return 'redCard'; }
      else if(qIndex % 3 === 2) { return 'greyCard'; }
    };

    $scope.saveAnswer = function(answerIndex) {

      console.log('saving');
      // Save answer
      Question.saveAnswer($scope.question.id, answerIndex)
      .then(function(newAnswer){

        console.log('new answer');
        console.log(newAnswer);


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

          console.log('question');
          console.log($scope.question.results);
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
