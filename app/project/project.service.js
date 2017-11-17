(function(angular) {
  'use strict';

  angular
    .module('app')
    .factory('projectService', projectService);

  projectService.$inject = ['$http', 'auth'];
  function projectService($http, auth) {
    var service = {
      get: get,
      create: create,
      update: update,
      destroy: destroy
    };
    
    return service;

    ////////////////

    function get() {
      return $http({
        method: 'GET',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects.json',
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
    function create(project) {
      return $http({
        method: 'POST',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects.json',
        headers: {
          'Authorization': auth.getToken()
        },
        data: project
      });
    }
    function update(project) {
      return $http({
        method: 'PUT',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects/' + project.id,
        headers: {
          'Authorization': auth.getToken()
        },
        data: project
      });
    }
    function destroy(project) {
      return $http({
        method: 'DELETE',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects/' + project.id,
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
  }
})(window.angular);
