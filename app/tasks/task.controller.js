(function() {
  'use strict';

  angular
    .module('app')
    .controller('TaskController', TaskController);

  TaskController.$inject = ['$scope', 'taskService'];
  function TaskController($scope, taskService) {
    var vm = this;
    vm.tasks = []
    vm.projectID = $scope.$parent.project.id
    vm.newTask = {};
    vm.editedTask = {};
    vm.errors = {};

    vm.addTask = addTask;
    vm.editTask = editTask;
    vm.deleteTask = deleteTask;

    activate();

    ////////////////

    function activate() {
      return taskService.getTasks(vm.projectID).then(function(response) {
        vm.tasks = response.data;
      });
    }

    function addTask(task) {
      return taskService.addTask(task)
        .then(function(response) {
          vm.tasks.push(response.data);
          vm.newTask = {};
          vm.errors = {};
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    };

    function editTask(task) {
      return taskService.editTask(task)
        .then(function() {
          vm.editedTask = {};
          vm.errors = {};
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    };

    function deleteTask(task) {
      return taskService.deleteTask(task)
        .then(function() {
          vm.tasks.splice(vm.tasks.indexOf(task), 1);
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }
  }
})();
