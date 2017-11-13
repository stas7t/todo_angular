(function(){
  'use strict';

  angular
    .module('app')
    .config(configure)

  configure.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configure($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('todo_list', {
        url: '/',
        templateUrl: '/app/todo_list/todolist.html',
        //controller: 'TodoListController',
        onEnter: ['$state', 'auth', function($state, auth) {
          if ( !auth.isLoggedIn() ) {
            $state.go('login');
          }
        }]
      })
      .state('login', {
          url: '/login',
          templateUrl: '/app/auth/auth_login.html',
          //controller: 'AuthController',
          onEnter: ['$state', 'auth', function($state, auth) {
          if ( auth.isLoggedIn() ) {
              $state.go('todo_list');
          }
          }]
      })
      .state('register', {
          url: '/register',
          templateUrl: '/app/auth/auth_register.html',
          //controller: 'AuthController',
          onEnter: ['$state', 'auth', function($state, auth) {
          if ( auth.isLoggedIn() ) {
              $state.go('todo_list');
          }
          }]
      });

    $urlRouterProvider.otherwise('/');
  }

}());
