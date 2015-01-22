'use strict';

angular.module('fuirApp')
  .controller('NavbarCtrl', function ($scope, $location, ParseUser) {

    $scope.isLoggedIn = Parse.User.current()? true: false;

    // ParseUser.isLoggedIn()
    // .then(function(isLoggedIn){
    //   console.log(isLoggedIn);
    //   $scope.isLoggedIn = isLoggedIn;
    // });


    //$scope.isAdmin = false;

    $scope.getCurrentUser = false;//ParseUser.getCurrentUser;


    // ParseUser.getPictureURL()
    // .then(function(pictureURL) {
    //   $scope.pictureURL = pictureURL;
    // })
    // .catch(function(err) {
    //   console.log(err);
    // });


    $scope.logout = function() {
      //ParseUser.logout();
      $scope.isLoggedIn = false;
      Parse.User.logOut();
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    // $scope.exampleData = [
    // 	{ key: "Right", y: 70 },
    //   { key: "Wrong", y: 30 }
    //  ];
    //
    // var colorArray = ['#FFA500','#BE1E2D'];
    // $scope.colorFunction = function() {
    //  return function(d, i) {
    //    return colorArray[i];
    //  };
    // }
    //
    // $scope.yFunction = function(){
    //  return function(d){
    //    return d.y;
    //  };
    // }
    // $scope.xFunction = function(){
    //  return function(d) {
    //    return d.key;
    //  };
    // }
  });
