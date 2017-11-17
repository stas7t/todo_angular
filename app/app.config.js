(function(angular) {
  'use strict';

  angular
    .module('app')
    .config(configure);

  configure.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configure($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('todo_list', {
        url: '/',
        template: '<project-list></project-list>',
        onEnter: ['$state', 'auth', function($state, auth) {
          if ( !auth.isLoggedIn() ) {
            $state.go('login');
          }
        }]
      })
      .state('login', {
        url: '/login',
        templateUrl: '/app/auth/auth_login.html',
        onEnter: ['$state', 'auth', function($state, auth) {
          if ( auth.isLoggedIn() ) {
            $state.go('todo_list');
          }
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: '/app/auth/auth_register.html',
        onEnter: ['$state', 'auth', function($state, auth) {
          if ( auth.isLoggedIn() ) {
            $state.go('todo_list');
          }
        }]
      });

    $urlRouterProvider.otherwise('/');
  }

})(window.angular);
