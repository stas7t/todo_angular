(function(angular) {
  'use strict';

  // Usage:
  // <comment-detail comment="..." on-delete="..."></comment-detail>
  // Creates:
  // Comment detail

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

    vm.delete = function() {
      vm.onDelete(vm.comment);
    };

    vm.update = function(prop, value) {
      vm.comment[prop] = value;
      vm.onUpdate(vm.comment, prop, value);
    };
  }
})(window.angular);
