(function(angular) {
  'use strict';

  angular
    .module('app')
    .constant('moment', moment)
    .constant('BASE_URL', 'https://stas7t-todo-api.herokuapp.com/api/v1/');
})(window.angular); 