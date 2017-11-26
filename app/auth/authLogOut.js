(function(angular) {
  'use strict';

  // Usage:
  // <log-out></log-out>
  // Creates:
  // Log-out button

  angular
    .module('app')
    .component('logOut', {
      templateUrl: 'app/auth/authLogOut.html',
      controller: LogOutController,
      controllerAs: 'auth',
    });

  LogOutController.$inject = ['$state', 'auth'];
  function LogOutController($state, auth) {
    var vm = this;
    vm.isLoggedIn = auth.isLoggedIn;
    vm.logOut = logOut;

    ////////////////

    function logOut() {
      auth.logOut();
      $state.go('login');
    }
  }
})(window.angular);
