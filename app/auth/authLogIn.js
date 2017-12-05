(function(angular) {
  'use strict';

  // Usage:
  // <log-in></log-in>
  // Creates:
  // Log-in form

  angular
    .module('app')
    .component('logIn', {
      templateUrl: 'app/auth/authLogIn.html',
      controller: LogInController,
      controllerAs: 'auth',
    });

  LogInController.$inject = ['$state', 'auth'];
  function LogInController($state, auth) {
    var vm = this;
    vm.user = {};
    vm.logIn = logIn;

    ////////////////

    function logIn(user) {
      auth.logIn(user)
        .then(function() {
          $state.go('todo_list');
        })
        .catch(function(response) {
          vm.error = response.data.error.user_authentication.join(' ');
        });
    }
  }
})(window.angular);
