'use strict';

angular.module('fuirApp')
  .factory('SMS', function ($resource, $q, $http) {

    // Public API here
    return {
      sendAppLink: function (phone) {
        var deferred = $q.defer();
        
        $http.post('/api/sms', { phone: phone})
        .success(function(results) {
          deferred.resolve(results);
        })
        .error(function(err) {
          deferred.reject(err);
        });

        return deferred.promise;
      }
  }
});
