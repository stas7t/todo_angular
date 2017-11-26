(function(angular) {
  'use strict';

  // Usage:
  // <task-list project="..." on-all-completed="..."></task-list>
  // Creates:
  // List of tasks

  angular
    .module('app')
    .component('taskList', {
      templateUrl: 'app/task/taskList.html',
      controller: TaskListController,
      controllerAs: 'tasks',
      bindings: {
        project: '<',
        onAllCompleted: '&'
      },
    });

  TaskListController.$inject = ['taskService'];
  function TaskListController(taskService) {
    var vm = this;
    vm.list = [];
    vm.newTask = {};
    vm.errors = {};

    vm.getTasks = getTasks;
    vm.addTask = addTask;
    vm.editTask = editTask;
    vm.deleteTask = deleteTask;

    ////////////////

    vm.$onInit = function() {
      vm.getTasks();
    };

    function getTasks() {
      return taskService.get(vm.project.id)
        .then(function(response) {
          vm.list = response.data;
        });
    }

    function addTask(task) {
      return taskService.create(vm.project.id, task)
        .then(function(response) {
          vm.list.push(response.data);
          vm.newTask = {};
          vm.errors = {};
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }

    function editTask(task) {
      return taskService.update(task)
        .then(function() {
          vm.getTasks();
          vm.errors = {};
          if (isAllCompleted()) {
            vm.onAllCompleted();
          }
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }

    function deleteTask(task) {
      return taskService.destroy(task)
        .then(function() {
          vm.list.splice(vm.list.indexOf(task), 1);
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }

    // Private
    function isTaskUncompleted(task) {
      return task.completed === false;
    }

    function isAllCompleted() {
      if (vm.list.find(isTaskUncompleted)) {
        return false;
      } else {
        return true;
      } 
    }
  }
})(window.angular);
