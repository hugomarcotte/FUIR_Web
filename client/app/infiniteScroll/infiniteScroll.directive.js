'use strict';

angular.module('fuirApp')
  .directive('infinitescroll', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {

        angular.element($window).bind("scroll", function() {

          if(element[0].clientHeight > 0) {

            var offset = attr.infinitescrolloffset || 0;
            var loadingHeight = element[0].clientHeight - offset;

            if ($window.scrollY + $window.innerHeight  >= loadingHeight) {

              scope.$apply(attr.infinitescroll);
            }
          }

        });
      }
    };
  });
