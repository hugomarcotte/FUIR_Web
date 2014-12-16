'use strict';

angular.module('fuirApp')
  .controller('LoginCtrl', function ($scope, $location, ParseUser) {

    $scope.loginOauth = function() {

      ParseUser.login()
      .then(function(){
        $location.path('/');
      })
      .catch(function(err) {
        console.log('Login error: '+err);
      });
    };
  });
