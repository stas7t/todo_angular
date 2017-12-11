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

  TaskDetailController.$inject = ['moment', 'taskService'];
  function TaskDetailController(moment, taskService) {
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
        vm.date = new Date(moment.utc(vm.task.deadline));
        vm.time = new Date(moment.utc(vm.task.deadline).seconds(0));
      } else {
        vm.date = new Date( moment() );
        vm.time = new Date( moment({hour: 12, minute: 0, second: 0}) );
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
      vm.deadlineMode = !vm.deadlineMode;
      var newTime = moment.utc(vm.date).format('YYYY-MM-DD') + ' ' + moment.utc(vm.time).seconds(0).format('HH:mm:ss');
      vm.task.deadline = moment.utc(newTime);
      vm.onUpdate(vm.task);
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
