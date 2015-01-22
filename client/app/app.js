'use strict';

angular.module('fuirApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'nvd3ChartDirectives',
  'bnx.module.facebook',
  'ngDialog',
  'ngMaterial'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    Parse.initialize('DJnfc0KsF8WRF0K2lr25mVm95Uzg0xnUAG72axAX', 'NTxalrgpCfGdeMwIVQ8r2budaoApAWpITreGfH10');
  });
