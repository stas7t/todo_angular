(function(angular) {
  'use strict';

  angular
    .module('app')
    .factory('deadlineService', deadlineService);

  deadlineService.$inject = ['$http', 'auth'];
  function deadlineService($http, auth) {
    var service = {
      create: create,
      update: update,
    };
    
    return service;

    ////////////////

    function create(project_id, task_id, deadline) {
      return $http({
        method: 'POST',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects/' + project_id + '/tasks/' + task_id +'/deadlines.json',
        headers: {
          'Authorization': auth.getToken()
        },
        data: deadline
      });
    }
    function update(deadline) {
      return $http({
        method: 'PUT',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/deadlines/' + deadline.id,
        headers: {
          'Authorization': auth.getToken()
        },
        data: deadline
      });
    }
  }
})(window.angular);
