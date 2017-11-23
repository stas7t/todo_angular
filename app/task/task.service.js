(function(angular) {
  'use strict';

  angular
    .module('app')
    .factory('taskService', taskService);

  taskService.$inject = ['$http', 'auth', 'BASE_URL'];
  function taskService($http, auth, BASE_URL) {
    var service = {
      get: get,
      create: create,
      update: update,
      destroy: destroy,
      getTask: getTask
    };
    
    return service;

    ////////////////

    function get(project_id) {
      return $http({
        method: 'GET',
        url: BASE_URL + 'projects/' + project_id +'/tasks.json',
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
    function create(project_id, task) {
      return $http({
        method: 'POST',
        url:  BASE_URL + 'projects/' + project_id +'/tasks.json',
        headers: {
          'Authorization': auth.getToken()
        },
        data: task
      });
    }
    function update(task) {
      return $http({
        method: 'PUT',
        url:  BASE_URL + 'tasks/' + task.id,
        headers: {
          'Authorization': auth.getToken()
        },
        data: task
      });
    }
    function destroy(task) {
      return $http({
        method: 'DELETE',
        url:  BASE_URL + 'tasks/' + task.id,
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
    function getTask(task_id) {
      return $http({
        method: 'GET',
        url: BASE_URL + 'tasks/' + task_id + '.json',
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
  }
})(window.angular);
