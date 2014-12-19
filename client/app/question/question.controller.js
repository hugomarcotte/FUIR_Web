'use strict';

angular.module('fuirApp')
  .controller('QuestionCtrl', function ($scope) {

    $scope.cardColor = function() {

      if ($scope.qIndex % 3 === 0) { return 'orangeCard'; }
      else if($scope.qIndex % 3 === 1) { return 'redCard'; }
      else if($scope.qIndex % 3 === 2) { return 'greyCard'; }
    };

  });
