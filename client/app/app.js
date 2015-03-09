'use strict';

angular.module('fuirApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'bnx.module.facebook',
  'ngDialog',
  'ngMaterial',
  'headroom',
  '720kb.socialshare',
  'ngAnimate'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
