(function(angular) {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

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
    vm.errors = {};

    vm.addProject = addProject;
    vm.editProject = editProject;
    vm.deleteProject = deleteProject;

    ////////////////

    vm.$onInit = function() {
      return projectService.get().then(function(response) {
        vm.list = response.data;
      });
    };
    //vm.$onChanges = function(changesObj) { };
    //vm.$onDestroy = function() { };

    function addProject(project) {
      return projectService.create(project)
        .then(function(response) {
          vm.list.push(response.data);
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
          vm.errors = {};
        })
        .catch(function(response) {
          vm.errors = response.data;
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
  }
})(window.angular);
