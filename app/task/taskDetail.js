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

    ////////////////

    vm.delete = function() {
      vm.onDelete(vm.task);
    };

    vm.update = function(prop, value) {
      vm.task[prop] = value;
      vm.onUpdate(vm.task, prop, value);
    };
  }
})(window.angular);
