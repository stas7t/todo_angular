(function(angular) {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

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

    //vm.$onInit = function() { };
    //vm.$onChanges = function(changesObj) { };
    //vm.$onDestroy = function() { };

    vm.delete = function() {
      vm.onDelete(vm.task);
    };

    vm.update = function(prop, value) {
      vm.task[prop] = value;
      vm.onUpdate(vm.task, prop, value);
    };
  }
})(window.angular);
