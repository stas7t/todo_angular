(function() {
  'use strict';

  angular
    .module('app')
    .factory('todoService', todoService);

  todoService.$inject = ['$http', 'auth'];
  function todoService($http, auth) {
    var service = {
      getTodos: getTodos,
      addTodo: addTodo,
      editTodo: editTodo,
      deleteTodo: deleteTodo
    };
    
    return service;

    ////////////////

    function getTodos() {
      return $http({
        method: 'GET',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects.json',
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
    function addTodo(project) {
      return $http({
        method: 'POST',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects',
        headers: {
          'Authorization': auth.getToken()
        },
        data: project
      });
    }
    function editTodo(project) {
      return $http({
        method: 'PUT',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects' + project.id,
        headers: {
          'Authorization': auth.getToken()
        },
        data: project
      });
    }
    function deleteTodo(project) {
      return $http({
        method: 'DELETE',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects' + project.id,
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
  }
})();