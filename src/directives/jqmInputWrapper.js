/**
 * @ngdoc jqmInputWrapper
 */
jqmModule.directive('jqmInputWrapper', ['jqmClassDirective', 'jqmPositionAnchorDirective', 
                    function(jqmClassDirectives, jqmPositionAnchorDirectives) {
  //We can't use template with replace & transclude because we want the inner
  //elements to stay the same order as placed beforehand
  return {
    restrict: 'A',
    controller: ['$scope', JqmInputWrapperCtrl],
    scope: {},
    replace: true,
    transclude: true,
    template: '<%= inlineTemplate("templates/jqmInputWrapper.html") %>'
  };

  function JqmInputWrapperCtrl($scope) {
    this.$scope = $scope;
  }
}]);
