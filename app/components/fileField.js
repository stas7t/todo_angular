(function(angular) {
  'use strict';

  angular
    .module('app')
    .component('fileField', {
      template: "<input type='file' name='file'>",
      controller: FileFieldController,
      bindings: {
        target: '='
      }
    });

  function FileFieldController($scope, $element, $attrs) {
    var ctrl = this;

    var fileSelect = $element[0].children[0];

    fileSelect.onchange = function() { //set callback to action after choosing file
      var f = fileSelect.files[0], r = new FileReader();

      r.onloadend = function(e) { //callback after files finish loading
        ctrl.target = e.target.result;
      };

      r.readAsDataURL(f); //once defined all callbacks, begin reading the file
    };
  }

})(window.angular);
