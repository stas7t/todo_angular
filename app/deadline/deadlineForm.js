(function(angular) {
  'use strict';

  // Usage:
  // <deadline-form task="..." on-create="..." on-update="..."></deadline-form>
  // Creates:
  // Task detail

  angular
    .module('app')
    .component('deadlineForm', {
      templateUrl: 'app/deadline/deadlineForm.html',
      controller: DeadlineFormController,
      controllerAs: 'deadlineForm',
      bindings: {
        task: '=',
        onCreate: '&',
        onUpdate: '&'
      },
    });

  DeadlineFormController.$inject = [];
  function DeadlineFormController() {
    var vm = this;

    ////////////////
    /*
    vm.delete = function() {
      vm.onDelete(vm.task);
    };

    vm.update = function(prop, value) {
      vm.task[prop] = value;
      vm.onUpdate(vm.task, prop, value);
    };
    */
  }
})(window.angular);
