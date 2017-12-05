(function(angular) {
  'use strict';

  angular
    .module('app')
    .directive('loading', loading);

  loading.$inject = ['$http'];
  function loading($http) {

    // Usage:
    // <div loading > ... loading animation ... </div>
    // Creates:
    // loading animation

    var directive = {
      link: link,
      restrict: 'A',
    };
    return directive;
    
    function link(scope, element, attrs) {
      scope.isLoading = function () {
        return $http.pendingRequests.length > 0;
      };

      scope.$watch(scope.isLoading, function (v) {
        v ? element.show() : element.hide();
      });
    }
  }
})(window.angular);
