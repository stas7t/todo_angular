(function(angular) {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('app')
    .component('commentDetail', {
      templateUrl: 'app/comment/commentDetail.html',
      controller: CommentDetailController,
      controllerAs: 'commentDetail',
      bindings: {
        comment: '=',
        onDelete: '&',
        onUpdate: '&'
      },
    });

  CommentDetailController.$inject = [];
  function CommentDetailController() {
    var vm = this;

    ////////////////

    //vm.$onInit = function() { };
    //vm.$onChanges = function(changesObj) { };
    //vm.$onDestroy = function() { };

    vm.delete = function() {
      vm.onDelete(vm.comment);
    };

    vm.update = function(prop, value) {
      vm.comment[prop] = value;
      vm.onUpdate(vm.comment, prop, value);
    };
  }
})(window.angular);
