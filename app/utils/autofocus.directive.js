(function(angular) {
  'use strict';

  angular
    .module('app')
    .directive('autofocus', autofocus);

  autofocus.$inject = ['$timeout'];
  function autofocus($timeout) {

    // Usage:
    // <input type="text" autofocus>
    // Creates:
    // autofocus on input element

    var directive = {
      link: link,
      restrict: 'A',
    };
    return directive;
    
    function link(scope, element, attrs) {
      $timeout(function() {
        element[0].focus();
      });
    }
  }
})(window.angular);
