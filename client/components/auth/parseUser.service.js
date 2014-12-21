'use strict';

angular.module('fuirApp')
.factory('ParseUser', function ($q, facebook) {
  var userName = '';
  var pictureUrl = '';

  return {

    login: function() {

      var deferred = $q.defer();

      facebook.login(null)
      .then(function(response){
        deferred.resolve();
      })
      .catch(function(err){
        console.log(err);
      });

      return deferred.promise;
    },

    isLoggedIn: function() {

      // console.log(Parse.User.current()? 'true':'false');
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

      // var deferred = $q.defer();
      //
      // if(userName || !Parse.User.current()) {
      //   deferred.resolve(userName);
      // }
      // else if(Parse.User.current()) {
      //   if(typeof FB !== 'undefined') {
      //     FB.getLoginStatus(function(response) {
      //       if (response.status === 'connected') {
      //         FB.api('/me', {fields: 'name'}, function(response) {
      //           if (!response || response.error) {
      //             deferred.reject(response.error);
      //           } else {
      //             userName = response.name;
      //             deferred.resolve(userName);
      //           }
      //         });
      //       }
      //       else {
      //         deferred.reject("FB user not logged in");
      //       }
      //     });
      //   }
      //   else {
      //     deferred.reject("FB SDK is not loaded");
      //   }
      // }
      // return deferred.promise;
    },

    getPictureURL: function() {
      var deferred = $q.defer();

      if(pictureUrl || !Parse.User.current()) {
        deferred.resolve(pictureUrl);
      }
      else if(Parse.User.current()) {

        facebook.api('/me/picture')
        .then(function(response){
          if (response && !response.error) {
            pictureUrl = response.data.url;
            deferred.resolve(pictureUrl);
          }
          else {
            deferred.reject(response.error);
          }
        })
        .catch(function(err){
          console.log(err);
          deferred.reject(err);
        });

      }
      return deferred.promise;
    }

  };
});
