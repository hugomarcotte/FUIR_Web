'use strict';

angular.module('fuirApp')
  .controller('NavbarCtrl', function ($scope, $mdSidenav, SMS) {

    $scope.openSideNav = function() {
      $mdSidenav('right').toggle();
    };



    $scope.smsSent = false;
    $scope.sendAppLink = function () {

      SMS.sendAppLink($scope.phoneNumber)
      .then(function(results){
        $scope.smsSent = true;
      })
      .catch(function(err){
        console.log(err);
      });
    };

    //$scope.isLoggedIn = Parse.User.current()? true: false;

    // ParseUser.isLoggedIn()
    // .then(function(isLoggedIn){
    //   console.log(isLoggedIn);
    //   $scope.isLoggedIn = isLoggedIn;
    // });


    //$scope.isAdmin = false;

    //$scope.getCurrentUser = false;//ParseUser.getCurrentUser;


    // ParseUser.getPictureURL()
    // .then(function(pictureURL) {
    //   $scope.pictureURL = pictureURL;
    // })
    // .catch(function(err) {
    //   console.log(err);
    // });


    // $scope.logout = function() {
    //   //ParseUser.logout();
    //   $scope.isLoggedIn = false;
    //   Parse.User.logOut();
    // };
    //
    // $scope.isActive = function(route) {
    //   return route === $location.path();
    // };


  });
