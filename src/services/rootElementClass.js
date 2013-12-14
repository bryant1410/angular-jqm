// Note: We don't create a directive for the html element,
// as sometimes people add the ng-app to the body element.
jqmModule.run(['$window', function($window) {
  jqLite($window.document.documentElement).addClass("ui-mobile");
}]);
