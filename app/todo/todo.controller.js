(function() {
  'use strict';

  angular
    .module('app')
    .controller('TodoController', TodoController);

  TodoController.$inject = ['todoService'];
  function TodoController(todoService) {
    var vm = this;
    vm.projects = [];
    vm.newProject = {};
    vm.editedProject = {};
    vm.errors = {};

    vm.addProject = addProject;
    vm.editProject = editProject;
    vm.deleteProject = deleteProject;

    activate();

    ////////////////

    function activate() {
      return todoService.getTodos().then(function(response) {
        vm.projects = response.data;
      });
    }

    function addProject(project) {
      return todoService.addTodo(project)
        .then(function(response) {
          vm.projects.push(response.data);
          vm.newProject = {};
          vm.errors = {};
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }

    function editProject(project) {
      return todoService.editTodo(project)
        .then(function() {
          vm.editedProject = {};
          vm.errors = {};
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }

    function deleteProject(project) {
      return todoService.deleteTodo(project)
        .then(function() {
          vm.projects.splice(vm.projects.indexOf(project), 1);
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }
  }
})();
