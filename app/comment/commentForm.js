(function(angular) {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('app')
    .component('commentForm', {
      templateUrl: 'app/comment/commentForm.html',
      controller: CommentFormController,
      controllerAs: 'commentForm',
      bindings: {
        task: '<',
        comments: '<'
      },
    });

  CommentFormController.$inject = ['commentService'];
  function CommentFormController(commentService) {
    var vm = this;
    vm.newComment = {};
    vm.errors = {};

    vm.addComment = addComment;

    ////////////////

    //vm.$onInit = function() { };
    //vm.$onChanges = function(changesObj) { };
    //vm.$onDestroy = function() { };

    function addComment(comment) {
      return commentService.create(vm.task.project_id, vm.task.id, comment)
        .then(function(response) {
          vm.comments.push(response.data);
          vm.newComment = {};
          vm.errors = {};
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }
  }
})(window.angular);
