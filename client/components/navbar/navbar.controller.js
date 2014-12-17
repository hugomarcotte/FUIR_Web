'use strict';

angular.module('fuirApp')
  .controller('NavbarCtrl', function ($scope, $location, ParseUser) {
    $scope.menu = [
    // {
    //   'title': 'Home',
    //   'link': '/'
    // }
    ];

    $scope.isCollapsed = true;

    $scope.isLoggedIn = ParseUser.isLoggedIn;

    $scope.isAdmin = false;

    $scope.getCurrentUser = ParseUser.getCurrentUser;

    ParseUser.getName()
    .then(function(name){
      $scope.userName = name;
    })
    .catch(function(err) {
      console.log(err);
    });


    $scope.logout = function() {
      ParseUser.logout();
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
