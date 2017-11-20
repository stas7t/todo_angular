(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$state', 'auth'];
  function AuthController($state, auth) {
    var vm = this;
    vm.user = {};
    vm.isLoggedIn = auth.isLoggedIn;
    vm.currentUser = auth.currentUser;

    vm.register = register;
    vm.logIn = logIn;
    vm.logOut = logOut;

    activate();

    ////////////////

    function register(user) {
      auth.register(user)
        .then(function() {
          $state.go('todo_list');
        })
        .catch(function(response) {
          vm.error = response.data;
        });
    }

    function logIn(user) {
      auth.logIn(user)
        .then(function() {
          $state.go('todo_list');
        })
        .catch(function(response) {
          vm.error = response.data.error.user_authentication.join(' ');
        });
    }

    function logOut() {
      auth.logOut();
      $state.go('login');
    }

    function activate() { }
  }
})(window.angular);
