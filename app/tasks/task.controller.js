(function() {
  'use strict';

  angular
    .module('app')
    .controller('TaskController', TaskController);

  TaskController.$inject = ['$scope', 'taskService'];
  function TaskController($scope, taskService) {
    var vm = this;
    vm.tasks = []
    //vm.$scope = $scope
    vm.p_id = $scope.$parent.project.id

    vm.addTask = addTask;
    vm.editTask = editTask;
    vm.deleteTask = deleteTask;

    activate();

    ////////////////

    function activate() {
      return taskService.getTasks(vm.p_id).then(function(response) {
        vm.tasks = response.data;
      });
    }
    function addTask() { };
    function editTask() { };

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
