(function(angular) {
  'use strict';

  // Usage:
  // <task-detail task="..." on-update="..." on-delete="..."></task-detail>
  // Creates:
  // Task detail

  angular
    .module('app')
    .component('taskDetail', {
      templateUrl: 'app/task/taskDetail.html',
      controller: TaskDetailController,
      controllerAs: 'taskDetail',
      bindings: {
        task: '=',
        onDelete: '&',
        onUpdate: '&'
      },
    });

  TaskDetailController.$inject = ['moment', 'taskService', 'deadlineService'];
  function TaskDetailController(moment, taskService, deadlineService) {
    var vm = this;
    vm.editMode = false;
    vm.deadlineMode = false;

    ////////////////

    vm.$onInit = function() {
      // Make a copy of the initial value to be able to reset it later
      vm.taskCopy = {'name': vm.task.name, 'deadline': vm.task.deadline};
      vm.initDateTime();
      if (vm.task.comments) {
        vm.commentsCount = vm.task.comments.length;
      } else {
        vm.commentsCount = 0;
      }
    };

    vm.initDateTime = function () {
      if (vm.task.deadline) {
        vm.date = new Date(moment.utc(vm.task.deadline.date));
        vm.time = new Date(moment.utc(vm.task.deadline.time));
      } else {
        vm.date = new Date( moment() );
        vm.time = new Date( moment({hour: 12, minute: 0}) );
      }
    };

    vm.edit = function (prop) {
      switch (prop) {
      case 'name':
        vm.editMode = !vm.editMode;
        break;
      case 'deadline':
        vm.deadlineMode = !vm.deadlineMode;
        break;
      default:
        break;
      }
    };

    vm.setDeadline = function () {
      if (vm.task.deadline) {
        deadlineService.update( {'id': vm.task.deadline.id, 'date': vm.date, 'time': vm.time} )
          .then(function() {
            vm.getTask();
          });
      } else {
        deadlineService.create(vm.task.project_id, vm.task.id, {'date': vm.date, 'time': vm.time})
          .then(function() {
            vm.getTask();
          });
      }
      vm.deadlineMode = !vm.deadlineMode;
    };

    vm.getTask = function () {
      return taskService.getTask(vm.task.id)
        .then(function(response) {
          vm.task = response.data;
          vm.errors = {};
        })
        .catch(function(response) {
          vm.errors = response.data;
        });
    };

    vm.commentsNumber = function () {
      if (vm.task.comments && vm.task.comments.length > 0) {
        return vm.task.comments.length;
      }
    };

    vm.updateCommentsCount = function (operator) {
      switch (operator) {
      case '+':
        vm.commentsCount += 1;
        break;
      case '-':
        vm.commentsCount -= 1;
        break;
      default:
        false;
        break;
      }

      /*if (vm.task.comments && vm.task.comments.length > 0) {
        return vm.task.comments.length;
      }*/
    };

    vm.deadlineAlert = function () {
      return moment().diff(vm.date, 'hours') >= 0;
    };

    vm.move = function (direction) {
      vm.task.move = direction;
      vm.onUpdate(vm.task);
    };

    vm.save = function() {
      vm.taskCopy.name = vm.task.name;
      vm.editMode = !vm.editMode;
      vm.onUpdate(vm.task);
    };

    vm.reset = function(prop) {
      switch (prop) {
      case 'name':
        vm.task.name = vm.taskCopy.name;
        vm.editMode = !vm.editMode;
        break;
      case 'deadline':
        vm.initDateTime();
        break;
      default:
        break;
      }
    };

    vm.delete = function() {
      vm.onDelete(vm.task);
    };

    vm.update = function(prop, value) {
      vm.task[prop] = value;
      vm.onUpdate(vm.task, prop, value);
    };
  }
})(window.angular);
