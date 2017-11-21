(function(angular) {
  'use strict';

  angular
    .module('app')
    .factory('projectService', projectService);

  projectService.$inject = ['$http', 'auth', 'BASE_URL'];
  function projectService($http, auth, BASE_URL) {
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
        url:  BASE_URL + 'projects.json',
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
    function create(project) {
      return $http({
        method: 'POST',
        url:  BASE_URL + 'projects.json',
        headers: {
          'Authorization': auth.getToken()
        },
        data: project
      });
    }
    function update(project) {
      return $http({
        method: 'PUT',
        url:  BASE_URL + 'projects/' + project.id,
        headers: {
          'Authorization': auth.getToken()
        },
        data: project
      });
    }
    function destroy(project) {
      return $http({
        method: 'DELETE',
        url:  BASE_URL + 'projects/' + project.id,
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
  }
})(window.angular);
