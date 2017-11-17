(function() {
  'use strict';

  angular
    .module('app')
    .factory('commentService', commentService);

  commentService.$inject = ['$http', 'auth'];
  function commentService($http, auth) {
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
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects/' + project_id + '/tasks/' + task_id +'/comments.json',
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
    function create(project_id, task_id, comment) {
      console.log('service', project_id, task_id)
      return $http({
        method: 'POST',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/projects/' + project_id + '/tasks/' + task_id +'/comments.json',
        headers: {
          'Authorization': auth.getToken()
        },
        data: comment
      });
    }
    function update(comment) {
      return $http({
        method: 'PUT',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/comments/' + comment.id,
        headers: {
          'Authorization': auth.getToken()
        },
        data: comment
      });
    }
    function destroy(comment) {
      return $http({
        method: 'DELETE',
        url: 'https://stas7t-todo-api.herokuapp.com/api/v1/comments/' + comment.id,
        headers: {
          'Authorization': auth.getToken()
        }
      });
    }
  }
})();
