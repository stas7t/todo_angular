(function() {
  'use strict';

  angular
    .module('app')
    .controller('TodoController', TodoController);

  TodoController.$inject = ['auth', 'todoService'];
  function TodoController(auth, todoService) {
    var vm = this;
    vm.projects = [];
    vm.addProject = addProject;
    

    activate();

    ////////////////

    function activate() {
      return todoService.getTodos().then(function(response) {
        vm.projects = response.data;
      });
    }

    function addProject(project) {
      return todoService.addTodo(project);
    }
  }
})();