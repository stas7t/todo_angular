(function(angular) {
  'use strict';

  // Usage:
  // <project-list></project-list>
  // Creates:
  // List of projects

  angular
    .module('app')
    .component('projectList', {
      templateUrl: 'app/project/projectList.html',
      controller: ProjectListController,
      controllerAs: 'projects',
    });

  ProjectListController.$inject = ['projectService'];
  function ProjectListController(projectService) {
    var vm = this;
    vm.list = [];
    vm.newProject = {};

    vm.addProject = addProject;
    vm.editProject = editProject;
    vm.deleteProject = deleteProject;
    vm.reset = reset;

    ////////////////

    vm.$onInit = function() {
      return projectService.get().then(function(response) {
        vm.list = response.data;
      });
    };

    function addProject(project) {
      return projectService.create(project)
        .then(function(response) {
          vm.list.push(response.data);
          vm.newProject = {};
          vm.errors = null;
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }

    function editProject(project) {
      return projectService.update(project)
        .then(function() {
          vm.errors = null;
        });
    }

    function deleteProject(project) {
      return projectService.destroy(project)
        .then(function() {
          vm.list.splice(vm.list.indexOf(project), 1);
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    }

    function reset() {
      vm.newProject = {};
      vm.errors = null;
    }
  }
})(window.angular);
