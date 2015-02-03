'use strict';

angular.module('fuirApp')
.controller('SidenavCtrl', function ($scope, $mdSidenav, SMS, $rootScope) {

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

  $scope.$watch('navOpen', function(newValue, oldValue) {
    if(newValue === true) { $rootScope.bodylayout = 'disableScroll'; }
    else { $rootScope.bodylayout = ''; }
  });

  $scope.closeSideNav = function () {
    $mdSidenav('left').close();
  };

});
