(function(angular) {
  'use strict';

  angular
    .module('app')
    .service('auth', auth);

  auth.$inject = ['$http', '$window'];
  function auth($http, $window) {
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
      return $http.post('https://stas7t-todo-api.herokuapp.com/api/v1/auth/register', user)
        .then(function(response) {
          saveToken(response.data.auth_token);
          console.info(response.data.message);
        })
        .catch(function(response) {
          console.log(response.data.error);
        });
    }

    function logIn(user) {
      return $http.post('https://stas7t-todo-api.herokuapp.com/api/v1/auth/login', user)
        .then(function(response) {
          saveToken(response.data.auth_token);
          console.info(response.data.message);
        })
        .catch(function(response) {
          console.log(response.data.error);
        });
    }

    function logOut() {
      $window.localStorage.removeItem('auth-token');
    }
  }
})(window.angular);
