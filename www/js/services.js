angular.module('app.services', [])
.service('ParseHttpService', function($http, $q){

    var baseURL = "https://api.parse.com/1/";
    var authenticationHeaders = {
      "x-parse-application-id": "7dnlESjpOdA8WiqzwCufG23b1RP48KZ6zoTx5WX5",
      "x-parse-rest-api-key": "cvJ43RVJTVe3Gz1vGdrW88rZ0Q95sEn9qTyVNFmj"
    };

    var CurrentUser = null;
    var CurrentUserIsRestored = false;

    function restoreUser(_sessionToken) {

      var tempHeaders = angular.copy(authenticationHeaders);
      angular.extend(tempHeaders, {"X-Parse-Session-Token": _sessionToken});

      var settings = {
        headers: tempHeaders
      };


      // $http returns a promise, which has a then function,
      // which also returns a promise
      return $http.get(baseURL + 'users/me', settings)
        .then(function (response) {
          // In the response resp.data contains the result
          // check the console to see all of the data returned
          console.log('restoreUser', response);

          CurrentUserIsRestored = true;

          return response.data;
        }, function (_error) {
          window.localStorage.setItem('CurrentUser', null);
          CurrentUserIsRestored = false;
          CurrentUser = null;
          console.log('restoreUser', _error);
          $q.reject("NO USER");
        });
    }
    return {
      login: function (credentials) {
        var settings = {
          headers: authenticationHeaders,
          params: {
            "username": (credentials && credentials.username),
            "password": (credentials && credentials.password)
          }
        };
        return $http.get(baseURL + 'login', settings)
          .then(function (response) {
            // NEW CODE - save the current user - NEW CODE !!!
           CurrentUser = response.data;
           window.localStorage.setItem('CurrentUser', JSON.stringify(CurrentUser));
            return response.data;
          });
      },

      getCurrentUser: function () {
        CurrentUser = window.localStorage.getItem('CurrentUser');
        CurrentUser = CurrentUser && JSON.parse(CurrentUser);

        if (CurrentUser) {
          if (CurrentUserIsRestored) {
            return $q.when(CurrentUser)
          }
          return restoreUser(CurrentUser.sessionToken);

        } else {
          return $q.reject("NO USER");
        }
      },

      Signup: function (credentials) {
        var settings = {
          async: 'true',
          crossDomain: 'true',
          headers: authenticationHeaders,
          method: 'POST',
          'X-Parse-Revocable-Session': 1,
          'Content-Type': 'application/json'
        };
        //    var url = "https://api.parse.com/1/users";

        var dataObject = JSON.stringify(credentials);

        console.log(dataObject);
        return $http.post(baseURL + 'users', dataObject, settings)
          .then(function (response) {
            // In the response resp.data contains the result
            // check the console to see all of the data returned
            console.log('addObject', response);
            return response.data;
          });
      },

      logout: function () {
        var tempHeaders = angular.copy(authenticationHeaders);
        angular.extend(tempHeaders, {"X-Parse-Session-Token": CurrentUser.sessionToken});
        var settings = {
          headers: tempHeaders
        };
        return $http.post(baseURL + 'logout', {}, settings)
          .then(function (response) {
            console.log('logout', response);
            window.localStorage.setItem('CurrentUser', null);
            return response;
          }, function (_error) {
            console.log(_error);
            window.localStorage.setItem('CurrentUser', null);
          });
      },
      deleteYakById: function (id) {
        var settings = {
          headers: authenticationHeaders
        };
        return $http.delete(baseURL + 'classes/Yaks/' + id, settings)
          .then(function (response) {
            return response.data;
          });
      },

      addYakToParse: function(YakObject, CurrentUser) {
        var NewYak = {
          "post": YakObject.post,
          "comments": [],
          "creator": CurrentUser.username,
          "blastTime": parseInt(YakObject.blastTime)
      };
        var settings = {
          async: true,
          crossDomain: true,
          headers: authenticationHeaders,
          url: "https://api.parse.com/1/classes/Yaks",
          method: "POST",
          data: JSON.stringify(NewYak)
        };

        return $http(settings).then(function(response){
          console.log("Yak added:", response);
          return response;
        }, function error(_errorResponse){
          alert("Error" + _errorResponse);
        })

      },

      GetAllYaks: function(){
        var settings={
          headers: authenticationHeaders
        };
       //Get everything from classes/1/Yaks and return them
        return $http.get(baseURL + 'classes/Yaks', settings)
          .then(function (response) {
            console.log('GotAllYaks', response.data.results);
            return response.data.results;
          }, function (error) {
            console.log('Error in GetAllYaks', error);
          });
      }

    }

});

