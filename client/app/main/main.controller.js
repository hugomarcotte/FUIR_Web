'use strict';

angular.module('fuirApp')
  .controller('MainCtrl', function ($scope, $stateParams, $location, Question, ngDialog, $mdSidenav) {
    $scope.questionIndex = 1;
    $scope.openFlag = false;

    // Get questions from server
    Question.getQuestions()
    .then(function(questions){

      $scope.questions = questions;

      var qId = $stateParams.qId;

      // If question Id in URL
      if(qId) {

        // Search for question in current loaded questions
        var found = false;
        for(var i =0; i < $scope.questions.length; i++) {
          if($scope.questions[i].id === $stateParams.qId) {
            $scope.qIndex = i+1;
            $scope.question = $scope.questions[i];
            $scope.showCard();
            found = true;
          }
        }

        // Load question from backend
        if(!found) {

          Question.getQuestion(qId)
          .then (function(question) {
            $scope.question = question;

            // to avoid having 31 questions
            $scope.questions.pop();
            $scope.questions.push(question);

            $scope.qIndex = $scope.questions.length;
            $scope.showCard();
            found = true;
          })
          .catch(function(err) {
            console.log('Cannot get question: ' +err);
          });
        }

      }
    })
    .catch(function(err) {
      console.log('Cannot get questions: ' +err);
    });


    $scope.$on('$locationChangeSuccess',function(event, next) {

      // if no qId in query string (privacy, terms...)
      if(next.indexOf('?qId=') !== -1) {

        // If back button is pressed get question from URL params
        if(!$scope.openFlag) {
          var questionId = next.slice(next.indexOf('?qId=')+5);
          for(var i =0; i < $scope.questions.length; i++) {
            if($scope.questions[i].objectId === questionId) {
              $scope.qIndex = i+1;
              $scope.question = $scope.questions[i];
            }
          }
        }
        else {
          $scope.openFlag = false;
        }

        $scope.showCard();
      }
      else {
        ngDialog.closeAll();
      }

    });

    $scope.getCardColor = function(qIndex) {
      if (qIndex % 4 === 0) { return 'orangeCard'; }
      else if(qIndex % 4 === 1) { return 'greyCard'; }
      else if(qIndex % 4 === 2) { return 'darkOrangeCard'; }
      else if(qIndex % 4 === 3) { return 'redCard'; }
    };

    $scope.openQuestionCard = function (question, qIndex) {
      if($scope.qIndex !== qIndex) {
        // Set question to show
        $scope.qIndex = qIndex;
        $scope.question = question;
        $scope.openFlag = true;

        // Change URL
        $location.search('qId', question.objectId);
      }
      else {
        $scope.showCard();
      }
    };

    $scope.showCard = function () {
      ngDialog.closeAll();

      var cardColor = $scope.getCardColor($scope.qIndex),
          cardColorClass = 'big'+ cardColor,
          randGuyNum = Math.floor(Math.random() * 8) + 1;

      ngDialog.open({
        template: 'questionTemplate',
        controller: 'QuestionCtrl',
        data: {question: $scope.question, randomGuyNumber: randGuyNum, cardColor: cardColor},
        className: 'ngdialog-theme-default '+cardColorClass
      });
    };

    $scope.busy = false;
    $scope.loadMoreQuestions = function() {

      if($scope.busy !== true && $scope.questions) {

         $scope.busy = true;
         Question.getQuestions()
         .then(function(questions){

           if(questions.length !== 0) {
             $scope.busy = false; // Stop API calls when empty;
           }
         });
      }
    };



});
