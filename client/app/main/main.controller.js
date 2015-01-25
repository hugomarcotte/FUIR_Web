'use strict';

angular.module('fuirApp')
  .controller('MainCtrl', function ($scope, $http, $stateParams, $location, Question, ngDialog) {
    $scope.questionIndex = 1;
    $scope.openFlag = false;


    if(!$scope.questions) {

      // Get questions from server
      Question.getQuestions()
      .then(function(questions){

        $scope.questions = questions;
        var qId = $stateParams.qId;

        // If question Id in URL
        if(qId) {
          var found = false;
          // Search for question in current loaded questions
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
    }

    $scope.$on('$locationChangeSuccess',function(event, next) {

      // if no qId in query string (privacy, terms...)
      if(next.indexOf('?qId=') !== -1) {

        // If back button is pressed get question from URL params
        if(!$scope.openFlag) {
          var questionId = next.slice(next.indexOf('?qId=')+5);
          for(var i =0; i < $scope.questions.length; i++) {
            if($scope.questions[i].id === questionId) {
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

    $scope.getRandomGuyNumber = function() {
      var num = Math.floor(Math.random() * 8) + 1;
      return num;
    };

    $scope.openQuestionCard = function (question, qIndex) {
      if($scope.qIndex !== qIndex) {
        // Set question to show
        $scope.qIndex = qIndex;
        $scope.question = question;
        $scope.openFlag = true;

        // Change URL
        $location.search('qId', question.id);
      }
      else {
        $scope.showCard();
      }
    };

    $scope.showCard = function () {

      ngDialog.closeAll();

      var cardColorClass = 'big'+ $scope.getCardColor($scope.qIndex);
      ngDialog.open({
        template: 'questionTemplate',
        controller: 'QuestionCtrl',
        data: {question: $scope.question, randomGuyNumber: $scope.getRandomGuyNumber(), cardColor: $scope.getCardColor($scope.qIndex)},
        className: 'ngdialog-theme-default '+cardColorClass
      });
    };
    



});
