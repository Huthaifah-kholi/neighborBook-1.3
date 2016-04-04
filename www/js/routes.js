angular.module('app.routes', [])         //////////////////////// this Done

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('menu', {
    url: '/side-menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.home', {
    url: '/home',
    views: {
      'side-menu': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.add.stuff', {
      url: '/stuff',
      views: {
        'stuff-tab': {
          templateUrl: 'templates/stuff.html',
          controller: 'stuffCtrl'
        }
      }
    })

  .state('menu.add.skill', {
    url: '/skill',
    views: {
      'skill-tab': {
        templateUrl: 'templates/skill.html',
        controller: 'skillCtrl'
      }
    }
  })

  .state('menu.add', {
    url: '/add',
    views: {
      'side-menu': {
        templateUrl: 'templates/add.html',
        controller: 'addCtrl'
      }
    }
  })

  .state('menu.pick', {
    url: '/pick',
    views: {
      'side-menu': {
        templateUrl: 'templates/pick.html',
        controller: 'pickCtrl'
      }
    }
  })
  .state('signIn',{
    url:'/signin',
    templateUrl :'templates/signin.html',
    controller: 'signInCtrl'
  }) 
/*
  .state('signUp',{
    url:'/signup',
    templateUrl :'templates/signup.html',
    controller: 'signUpCtrl'
  })
*/
$urlRouterProvider.otherwise('/signin')

  

});