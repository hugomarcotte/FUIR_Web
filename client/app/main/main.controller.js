'use strict';

angular.module('fuirApp')
  .controller('MainCtrl', function ($scope, SMS, $timeout) {

    $scope.smsSent = false;
    $scope.sendAppLink = function () {

      SMS.sendAppLink($scope.phoneNumber)
      .then(function(results){
        $scope.smsSent = true;
        $scope.phoneNumber = null;

        $timeout(function(){
          $scope.smsSent = false;
        }, 2000);
      })
      .catch(function(err){
        console.log(err);
      });
    };

});
