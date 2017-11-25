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
          //vm.error = response.data;
          vm.errors = [];
          for (var key in response.data) {
            // skip loop if the property is from prototype
            if (!response.data.hasOwnProperty(key)) continue;
            switch (key) {
            case 'password':
              vm.errors.push('Password does not meet minimal requirements. The length should be 8 characters, alphanumeric.');
              break;
            case 'password_confirmation':
              vm.errors.push('Password and Confirm password fields doesn\'t match.');
              break;
            default:
              vm.errors.push(response.data[key].join(' '));
              break;
            }
          }
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
