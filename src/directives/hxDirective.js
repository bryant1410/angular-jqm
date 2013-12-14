jqmModule.directive({
  h1: hxDirective,
  h2: hxDirective,
  h3: hxDirective,
  h4: hxDirective,
  h5: hxDirective,
  h6: hxDirective
});
function hxDirective() {
  return {
    restrict: 'E',
    require: ['?^jqmHeader', '?^jqmFooter'],
    link: function(scope, element, attr, ctrls) {
      if (ctrls[0] || ctrls[1]) {
        element.addClass("ui-title");
      }
    }
  };
}
