(function(angular) {
  'use strict';

  angular
    .module('app')
    .factory('taskService', taskService);

  taskService.$inject = ['$http', 'auth'];
  function taskService($http, auth) {
    var service = {
      get: get,
      create: create,
      update: update,
      destroy: destroy
    };
    
    return service;

    ////////////////

    function get(project_id) {
      return $http({
        method: 'GET',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects/' + project_id +'/tasks.json',
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
    function create(project_id, task) {
      return $http({
        method: 'POST',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects/' + project_id +'/tasks.json',
        headers: {
          'Authorization': auth.getToken()
        },
        data: task
      });
    }
    function update(task) {
      return $http({
        method: 'PUT',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/tasks/' + task.id,
        headers: {
          'Authorization': auth.getToken()
        },
        data: task
      });
    }
    function destroy(task) {
      return $http({
        method: 'DELETE',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/tasks/' + task.id,
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
  }
})(window.angular);
