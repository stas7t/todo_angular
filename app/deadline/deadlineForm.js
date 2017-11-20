(function(angular) {
  'use strict';

  // Usage:
  // <deadline-form deadline="..." project_id="..." task_id="..."></deadline-form>
  // Creates:
  // Deadline form

  angular
    .module('app')
    .component('deadlineForm', {
      templateUrl: 'app/deadline/deadlineForm.html',
      controller: DeadlineFormController,
      controllerAs: 'deadlineForm',
      bindings: {
        deadline: '<',
        projectId: '<',
        taskId: '<',
      },
    });

  DeadlineFormController.$inject = ['deadlineService'];
  function DeadlineFormController(deadlineService) {
    var vm = this;
    vm.deadlineP = {};

    ////////////////

    vm.$onInit = function() {
      // Make a copy of the initial value to be able to reset it later
      if (vm.deadline) {
        var date = new Date(Date.parse(vm.deadline.date));
        var time = new Date(Date.parse(vm.deadline.time));
        vm.deadlineP = {'date': date, 'time': time, 'id': vm.deadline.id};
        vm.deadlineCopy = {'date': vm.deadline.date, 'time': vm.deadline.time};
      }
    };

    vm.save = function() {
      if (vm.deadline) {
        deadlineService.update(vm.deadlineP);
      } else {
        deadlineService.create(vm.projectId, vm.taskId, vm.deadlineP);
      }
    };

    vm.reset = function() {
      vm.deadline.date = vm.deadlineCopy.date;
      vm.deadline.time = vm.deadlineCopy.time;
      vm.deadlineP = {};
    };
  }
})(window.angular);
