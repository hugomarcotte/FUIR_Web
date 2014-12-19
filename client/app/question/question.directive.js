'use strict';

angular.module('fuirApp')
  .directive('question', function () {
    return {
      controller: 'QuestionCtrl',
      templateUrl: 'app/question/question.html',
      restrict: 'E',
      scope: {
        question: '=q',
        qIndex: '@i'
      },
      link: function (scope, element, attrs) {
      }
    };
  });
