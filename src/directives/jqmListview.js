/**
 * @ngdoc directive
 * @name jqm.directive:jqmListview
 * @restrict A
 *
 * @description 
 * Creates a jQuery mobile listview.  Add jqmLiDivider, jqmLiEntry, and/or jqmLiLinks inside.
 *
 * @param {string=} inset Whether this listview should be inset or not. Default false.
 * @param {string=} shadow Whether this listview should have a shadow or not (only applies if inset). Default false.
 * @param {string=} corners Whether this listview should have corners or not (only applies if inset). Default false.
 *
 * @example
<example module="jqm">
  <file name="index.html">
  <div ng-init="list=[1,2,3,4,5,6]"></div>
  <h3>Entries</h3>
  <ul jqm-listview>
    <li jqm-li-entry>Hello, entry!</li>
    <li jqm-li-entry>Another entry!</li>
    <li jqm-li-entry>More!! entry!</li>
    <li jqm-li-divider jqm-theme="b">Divider</li>
    <li jqm-li-entry>Hello, entry!</li>
    <li jqm-li-entry>Another entry!</li>
    <li jqm-li-entry>More!! entry!</li>
  </ul>
  <h3>Links</h3>
  <ul jqm-listview>
    <li ng-repeat="i in list" jqm-li-link="#/{{i}}">{{i}}</li>
    <li jqm-li-divider jqm-theme="b">Here's a thumbnail with a count</li>
    <li jqm-li-link icon="ui-icon-home">
    <img jqm-li-thumb src="http://placekitten.com/80/80">
    <h2 class="ui-li-heading">Kitten!</h2>
    <p class="ui-li-desc">Subtext here. Yeah.</p>
    <span jqm-li-count>44</span>
    </li>
  </ul>
  </file>
</example>
 */
jqmModule.directive('jqmListview', [function() {
  return {
    restrict: 'A',
    replace: true,
    transclude: true,
    template: '<%= inlineTemplate("templates/jqmListview.html") %>',
    scope: {
      inset: '@',
      corners: '@',
      shadow: '@'
    },
    link: function(scope, elm, attr) {
      scope.useDefaultShadow = !isDefined(attr.shadow);
      scope.useDefaultCorners = !isDefined(attr.corners);
    }
  };
}]);
