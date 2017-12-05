(function(angular) {
  'use strict';

  angular
    .module('app')
    .factory('deadlineService', deadlineService);

  deadlineService.$inject = ['$http', 'auth', 'BASE_URL'];
  function deadlineService($http, auth, BASE_URL) {
    var service = {
      create: create,
      update: update,
    };
    
    return service;

    ////////////////

    function create(project_id, task_id, deadline) {
      return $http({
        method: 'POST',
        url: BASE_URL + 'projects/' + project_id + '/tasks/' + task_id +'/deadlines.json',
        headers: {
          'Authorization': auth.getToken()
        },
        data: deadline
      });
    }
    function update(deadline) {
      return $http({
        method: 'PUT',
        url: BASE_URL + 'deadlines/' + deadline.id,
        headers: {
          'Authorization': auth.getToken()
        },
        data: deadline
      });
    }
  }
})(window.angular);
