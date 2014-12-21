'use strict';

angular.module('fuirApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'nvd3ChartDirectives',
  'bnx.module.facebook'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
