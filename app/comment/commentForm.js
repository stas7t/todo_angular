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
        comments: '<',
        onAddComment: '&',
      },
    });

  CommentFormController.$inject = ['$scope', 'commentService'];
  function CommentFormController($scope, commentService) {
    var vm = this;
    vm.newComment = {};

    vm.addComment = addComment;

    ////////////////

    function addComment(comment) {
      return commentService.create(vm.task.project_id, vm.task.id, comment)
        .then(function(response) {
          vm.comments.push(response.data);
          vm.newComment = {};
          vm.errors = null;
          vm.onAddComment();
        })
        .catch(function(response) {
          vm.errors = [];
          for (var key in response.data) {
            // skip loop if the property is from prototype
            if (!response.data.hasOwnProperty(key)) continue;

            var message = response.data[key].join(' ');
            if (message.includes('file size')) {
              vm.errors.push('An uploaded file is too large. The sie shouldn\'t exeed 10 MB');
            } else if (message.includes('You are not allowed to upload')) {
              vm.errors.push('Wrong format. You can upload a *.jpg or *.png formats files only');
            } else { vm.errors.push(message); }
          }
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
