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

  DeadlineFormController.$inject = ['moment', 'deadlineService'];
  function DeadlineFormController(moment, deadlineService) {
    var vm = this;
    vm.deadlineP = {};

    ////////////////

    vm.$onInit = function() {
      // Make a copy of the initial value to be able to reset it later
      console.log('moment test' , moment().get('year'))
      if (vm.deadline) {
        var date = new Date(Date.parse(vm.deadline.date));
        var time = new Date(Date.parse(vm.deadline.time));
        vm.deadlineP = {'date': date, 'time': time, 'id': vm.deadline.id};
        vm.deadlineCopy = {'date': vm.deadline.date, 'time': vm.deadline.time};
      } else {
        var date1 = new Date();
        var initial_time = new Date(12.5*60*1000*60);
        var time1 = new Date(Date.parse(initial_time));
        vm.deadlineP = {'date': date1, 'time': time1};
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
      if (vm.deadline) {
        vm.deadline.date = vm.deadlineCopy.date;
        vm.deadline.time = vm.deadlineCopy.time;
      }
      vm.deadlineP = {};
      vm.$onInit();
    };
  }
})(window.angular);
