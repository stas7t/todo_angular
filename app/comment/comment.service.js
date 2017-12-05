(function(angular) {
  'use strict';

  angular
    .module('app')
    .factory('commentService', commentService);

  commentService.$inject = ['$http', 'auth', 'BASE_URL'];
  function commentService($http, auth, BASE_URL) {
    var service = {
      get: get,
      create: create,
      update: update,
      destroy: destroy
    };
    
    return service;

    ////////////////

    function get(project_id, task_id) {
      return $http({
        method: 'GET',
        url:  BASE_URL + 'projects/' + project_id + '/tasks/' + task_id +'/comments.json',
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
    function create(project_id, task_id, comment) {
      return $http({
        method: 'POST',
        url:  BASE_URL + 'projects/' + project_id + '/tasks/' + task_id +'/comments.json',
        headers: {
          'Authorization': auth.getToken()
        },
        data: comment
      });
    }
    function update(comment) {
      return $http({
        method: 'PUT',
        url:  BASE_URL + 'comments/' + comment.id,
        headers: {
          'Authorization': auth.getToken()
        },
        data: comment
      });
    }
    function destroy(comment) {
      return $http({
        method: 'DELETE',
        url:  BASE_URL + 'comments/' + comment.id,
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
  }
})(window.angular);
