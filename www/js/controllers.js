angular.module('app.controllers', ['app.services'])

.controller('loginCtrl', function($scope,$state, ParseHttpService, $timeout) {
    $scope.credentials = {};

    $scope.doLoginAction = function () {
      console.log($scope.credentials);
      ParseHttpService.login($scope.credentials).then(function (_user) {
        console.log("hello");
        $timeout(function () {

          $state.go('tabsController.trending', {});
          console.log("user", _user);

        }, 2);

      }, function (_error) {
        alert("Login Error " + (_error.message ? _error.message : _error.data.error));
        $state.go('login', {});
      });
    }

})

.controller('signupCtrl', function($scope) {

})

.controller('trendingCtrl', function($scope) {

})

.controller('addYakCtrl', function($scope) {

})

.controller('yakDetailCtrl', function($scope) {

})

.controller('profileCtrl', function($scope) {

})
