'use strict';

angular.module('fuirApp')
  .controller('BlogCtrl', function ($scope, $window) {

    $window.location.href = 'http://fuirblog.herokuapp.com/?feed=rss2';
  });
