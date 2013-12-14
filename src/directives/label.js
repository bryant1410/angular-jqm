jqmModule.directive('label', [function() {
  return {
    restrict: 'E',
    require: '^?jqmInputWrapper',
    link: function(scope, element, attr, wrapperCtrl) {
      if (wrapperCtrl) {
        element.addClass('ui-input-text');
      }
    }
  };
}]);
