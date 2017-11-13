(function() {
  'use strict';

  angular
    .module('app')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$state', 'auth'];
  function AuthController($state, auth) {
    var vm = this;
    vm.user = {};

    vm.register = register;
    vm.logIn = logIn;

    activate();

    ////////////////

    function register(user) {
      auth.register(user)
      .then(function(response) {
        $state.go('todo_list');
      });
    }

    function logIn(user) {
      auth.logIn(user)
      .then(function(response) {
        $state.go('todo_list');
      });
    }

    function activate() { }
  }
})();