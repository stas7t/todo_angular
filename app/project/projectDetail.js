(function(angular) {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

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

    //vm.$onInit = function() { };
    //vm.$onChanges = function(changesObj) { };
    //vm.$onDestroy = function() { };

    vm.delete = function() {
      vm.onDelete(vm.project);
    };

    vm.update = function(prop, value) {
      vm.project[prop] = value;
      vm.onUpdate(vm.project, prop, value);
    };
  }
})(window.angular);
