(function(angular) {
  'use strict';

  angular
    .module('app')
    .service('auth', auth);

  auth.$inject = ['$http', '$window', 'BASE_URL'];
  function auth($http, $window, BASE_URL) {
    this.saveToken = saveToken;
    this.getToken = getToken;
    this.isLoggedIn = isLoggedIn;
    this.currentUser = currentUser;
    this.register = register;
    this.logIn = logIn;
    this.logOut = logOut;

    ////////////////

    function saveToken(token) {
      $window.localStorage['auth-token'] = token;
    }

    function getToken() {
      return $window.localStorage['auth-token'];
    }

    function isLoggedIn() {
      var token = getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    }

    function currentUser() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload;
      }
    }

    function register(user) {
      return $http.post( BASE_URL + 'auth/register', user)
        .then(function(response) {
          saveToken(response.data.auth_token);
        });
    }

    function logIn(user) {
      return $http.post( BASE_URL + 'auth/login', user)
        .then(function(response) {
          saveToken(response.data.auth_token);
        });
    }

    function logOut() {
      $window.localStorage.removeItem('auth-token');
    }
  }
})(window.angular);
