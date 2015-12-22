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

.controller('signupCtrl', function($scope,$state,ParseHttpService) {
    $scope.SignUpDetails = {
      username: "",
      password: "",
      email: ""
    };
    $scope.doSignUp = function () {
      if ($scope.SignUpDetails.email.slice(-3).toLowerCase() == "edu") {
        ParseHttpService.Signup($scope.SignUpDetails).then(function (_user) {
            alert("Congratulaltion, you are signed up for TweakYak! Enjoy!!")
            $state.go('login', {});
        })
      }
      else{
        alert("Only .edu accounts allowed on TweakYak!");
      }
      $scope.SignUpDetails = {
        username: "",
        password: "",
        email: ""
      };

    }
})

.controller('trendingCtrl', function($scope, ParseHttpService) {
  $scope.YaksToDisplay = [];
    ParseHttpService.GetAllYaks().then(function(response){
      $scope.YaksToDisplay = response;
    });
})

.controller('addYakCtrl', function($scope) {

})

.controller('yakDetailCtrl', function($scope) {

})

.controller('profileCtrl', function($scope) {

});
