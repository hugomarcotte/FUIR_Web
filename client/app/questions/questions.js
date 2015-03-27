'use strict';

angular.module('fuirApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        url: '/q?qId',
        templateUrl: 'app/questions/questions.html',
        controller: 'QuestionsCtrl',
        reloadOnSearch : false
      });

  });
