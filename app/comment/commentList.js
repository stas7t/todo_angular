(function(angular) {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('app')
    .component('commentList', {
      templateUrl: 'app/comment/commentList.html',
      controller: CommentListController,
      controllerAs: 'comments',
      bindings: {
        //project: '<',
        task: '<'
      },
    });

  CommentListController.$inject = ['commentService'];
  function CommentListController(commentService) {
    var vm = this;
    vm.list = [];
    vm.newComment = {};
    vm.errors = {};

    vm.addComment = addComment;
    vm.editComment = editComment;
    vm.deleteComment = deleteComment;

    ////////////////

    vm.$onInit = function() {
      return commentService.get(vm.task.project_id, vm.task.id)
        .then(function(response) {
          vm.list = response.data;
        });
    };
    //vm.$onChanges = function(changesObj) { };
    //vm.$onDestroy = function() { };

    function addComment(comment) {
      console.log(vm.task.project_id, vm.task.id)
      return commentService.create(vm.task.project_id, vm.task.id, comment)
        .then(function(response) {
          vm.list.push(response.data);
          vm.newComment = {};
          vm.errors = {};
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }

    function editComment(comment) {
      return commentService.update(vm.task.project_id, vm.task.id, comment)
        .then(function() {
          vm.errors = {};
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }

    function deleteComment(comment) {
      return commentService.destroy(comment)
        .then(function() {
          vm.list.splice(vm.list.indexOf(comment), 1);
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }
  }
})(window.angular);
