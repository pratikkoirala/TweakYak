angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
    .state('tabsController', {
      url: '/page16',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    
      
        
    .state('login', {
      url: '/page20',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('signup', {
      url: '/page21',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
        
    .state('tabsController.trending', {
      url: '/page22',
      views: {
        'tab4': {
          templateUrl: 'templates/trending.html',
          controller: 'trendingCtrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.addYak', {
      url: '/page23',
      views: {
        'tab5': {
          templateUrl: 'templates/addYak.html',
          controller: 'addYakCtrl'
        }
      }
    })
        
      
    
      
        
    .state('yakDetail', {
      url: '/page24',
      templateUrl: 'templates/yakDetail.html',
      controller: 'yakDetailCtrl'
    })
        
      
    
      
        
    .state('tabsController.profile', {
      url: '/page25',
      views: {
        'tab6': {
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
        }
      }
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page20');

});