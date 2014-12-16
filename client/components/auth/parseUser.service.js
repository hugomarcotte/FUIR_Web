'use strict';

angular.module('fuirApp')
.factory('ParseUser', function ($q) {
  var userName = '';

  return {

    login: function() {

      var deferred = $q.defer();

      Parse.FacebookUtils.logIn(null, {
        success: function(user) {
          FB.api('/me', {fields: 'name'}, function(response) {
            userName = response.name;
            deferred.resolve();
          });
        },
        error: function(user, error) {
          deferred.reject(error);
        }
      });

      return deferred.promise;
    },

    isLoggedIn: function() {
      return Parse.User.current()? true:false;
    },

    getCurrentUser: function() {
      return Parse.User.current();
    },

    logout: function() {
      userName = '';
      Parse.User.logOut();
    },

    getId: function() {
      return  Parse.User.current().id;
    },

    getName: function() {

      var deferred = $q.defer();

      if(userName || !Parse.User.current()) {
        deferred.resolve(userName);
      }
      else if(Parse.User.current()) {
        FB.api('/me', {fields: 'name'}, function(response) {
          if (!response || response.error) {
            deferred.reject(response.error);
          } else {
            userName = response.name;
            deferred.resolve(userName);
          }
        });
      }
      return deferred.promise;
    }

  };
});
