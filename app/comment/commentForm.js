(function(angular) {
  'use strict';

  // Usage:
  // <comment-form task="..." comments="..."></comment-form>
  // Creates:
  // Form for adding comments

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

  CommentFormController.$inject = ['$scope', 'commentService'];
  function CommentFormController($scope, commentService) {
    var vm = this;
    vm.newComment = {};
    vm.errors = {};

    vm.addComment = addComment;

    ////////////////

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

    var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelect.type = 'file';

    if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
      return;
    }
  
    vm.addFile = function() { //activate function to begin input file on click
      fileSelect.click();
    };

    fileSelect.onchange = function() { //set callback to action after choosing file
      var f = fileSelect.files[0], r = new FileReader();

      r.onloadend = function(e) { //callback after files finish loading
        vm.newComment.file = e.target.result;
        $scope.$apply();
      };

      r.readAsDataURL(f); //once defined all callbacks, begin reading the file
    };
  }
})(window.angular);
