'use strict';

angular.module('fuirApp')
.factory('ParseUser', function ($q) {
  var userName = '';
  var pictureUrl = '';

  return {

    login: function() {

      var deferred = $q.defer();

      Parse.FacebookUtils.logIn(null, {
        success: function(user) {
          FB.api('/me', {fields: 'name'}, function(response) {

            if (response && !response.error) {
              userName = response.name;

              FB.api(
                "/me/picture",
                function (response2) {
                  if (response2 && !response2.error) {
                    pictureUrl = response2.data.url;
                  }
                  else {
                    console.log(response2.error);
                  }
              });
            }
            else {
              console.log(response.error);
            }
          });

          deferred.resolve();
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
    },

    getPictureURL: function() {
      var deferred = $q.defer();

      if(pictureUrl || !Parse.User.current()) {
        deferred.resolve(pictureUrl);
      }
      else if(Parse.User.current()) {
        FB.api(
          "/me/picture",
          function (response) {
            if (response && !response.error) {
              pictureUrl = response.data.url;
              deferred.resolve(pictureUrl);
            }
            else {
              deferred.reject(response.error);
            }
          }
        );
      }

      return deferred.promise;
    }

  };
});
