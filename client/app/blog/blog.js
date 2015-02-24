'use strict';

angular.module('fuirApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('blog', {
        url: '/blog/?feed',
        controller: 'BlogCtrl'
      });
  });
