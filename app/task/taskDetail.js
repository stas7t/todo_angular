(function(angular) {
  'use strict';

  // Usage:
  // <task-detail task="..." on-update="..." on-delete="..."></task-detail>
  // Creates:
  // Task detail

  angular
    .module('app')
    .component('taskDetail', {
      templateUrl: 'app/task/taskDetail.html',
      controller: TaskDetailController,
      controllerAs: 'taskDetail',
      bindings: {
        task: '=',
        onDelete: '&',
        onUpdate: '&'
      },
    });

  TaskDetailController.$inject = [];
  function TaskDetailController() {
    var vm = this;
    vm.editMode = false;
    vm.deadlineMode = false;

    ////////////////

    vm.$onInit = function() {
      // Make a copy of the initial value to be able to reset it later
      //vm.fieldValueCopy = vm.fieldValue;
      vm.taskCopy = {'name': vm.task.name};
    };

    vm.edit = function () {
      vm.editMode = !vm.editMode;
    };

    vm.setDeadline = function () {
      vm.deadlineMode = !vm.deadlineMode;
    };

    vm.save = function() {
      //vm.update('name', vm.task.name);
      vm.taskCopy.name = vm.task.name;
      vm.editMode = !vm.editMode;
      vm.onUpdate(vm.task);
    };

    vm.reset = function() {
      vm.task.name = vm.taskCopy.name;
      vm.editMode = !vm.editMode;
    };

    vm.delete = function() {
      vm.onDelete(vm.task);
    };

    vm.update = function() {
      vm.onUpdate(vm.task);
    };
  }
})(window.angular);
