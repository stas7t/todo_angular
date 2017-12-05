(function(angular) {
  'use strict';

  // Usage:
  // <project-detail project="..." on-update="..." on-delete="..."></project-detail>
  // Creates:
  // Project detail

  angular
    .module('app')
    .component('projectDetail', {
      templateUrl: 'app/project/projectDetail.html',
      controller: ProjectDetailController,
      controllerAs: 'projectDetail',
      bindings: {
        project: '<',
        onDelete: '&',
        onUpdate: '&'
      },
    });

  ProjectDetailController.$inject = [];
  function ProjectDetailController() {
    var vm = this;
    vm.editMode = false;
    vm.showTasks = false;

    ////////////////

    vm.$onInit = function() {
      // Make a copy of the initial value to be able to reset it later
      vm.projectCopy = {'name': vm.project.name};
      vm.allCompleted = false;
    };

    vm.showAllCompletedMessage = function () {
      vm.allCompleted = true;
    };

    vm.toggleTasksView = function () {
      vm.showTasks = !vm.showTasks;
    };

    vm.edit = function () {
      vm.editMode = !vm.editMode;
    };

    vm.save = function() {
      vm.onUpdate(vm.project)
        .then(function() {
          vm.projectCopy.name = vm.project.name;
          vm.editMode = !vm.editMode;
          vm.errors = null;
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    };

    vm.reset = function() {
      vm.project.name = vm.projectCopy.name;
      vm.editMode = !vm.editMode;
      vm.errors = null;
    };

    vm.delete = function() {
      vm.onDelete(vm.project);
    };
  }
})(window.angular);
