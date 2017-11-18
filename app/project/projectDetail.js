(function(angular) {
  'use strict';

  // Usage:
  // <project-detail project="..." on-update="..." on-delete="..."></project-detail>
  // Creates:
  // Project detail

  angular
    .module('app')
    .component('projectDetail', {
      templateUrl: 'app/project/projectDetail.html',
      controller: ProjectDetailController,
      controllerAs: 'projectDetail',
      bindings: {
        project: '=',
        onDelete: '&',
        onUpdate: '&'
      },
    });

  ProjectDetailController.$inject = [];
  function ProjectDetailController() {
    var vm = this;

    ////////////////

    vm.delete = function() {
      vm.onDelete(vm.project);
    };

    vm.update = function(prop, value) {
      vm.project[prop] = value;
      vm.onUpdate(vm.project);
    };
  }
})(window.angular);
