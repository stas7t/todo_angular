(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['projectService'];
  function ProjectController(projectService) {
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
      return projectService.get().then(function(response) {
        vm.projects = response.data;
      });
    }

    function addProject(project) {
      return projectService.create(project)
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
      return projectService.update(project)
        .then(function() {
          vm.editedProject = {};
          vm.errors = {};
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }

    function deleteProject(project) {
      return projectService.destroy(project)
        .then(function() {
          vm.projects.splice(vm.projects.indexOf(project), 1);
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }
  }
})();
