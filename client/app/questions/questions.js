'use strict';

angular.module('fuirApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        url: '/questions?Id',
        templateUrl: 'app/questions/questions.html',
        controller: 'QuestionsCtrl',
        reloadOnSearch : false
      });

  });
