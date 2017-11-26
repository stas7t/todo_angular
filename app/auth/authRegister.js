(function(angular) {
  'use strict';

  // Usage:
  // <register></register>
  // Creates:
  // Register form

  angular
    .module('app')
    .component('register', {
      templateUrl: 'app/auth/authRegister.html',
      controller: RegisterController,
      controllerAs: 'auth',
    });

  RegisterController.$inject = ['$state', 'auth'];
  function RegisterController($state, auth) {
    var vm = this;
    vm.user = {};
    vm.register = register;

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
  }
})(window.angular);
