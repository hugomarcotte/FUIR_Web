'use strict';

angular.module('fuirApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('terms', {
        url: '/terms',
        templateUrl: 'app/terms/terms.html',
        controller: 'TermsCtrl'
      });
  });