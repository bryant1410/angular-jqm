/**
 * @ngdoc directive
 * @name jqm.directive:jqmSlider
 * @restrict A
 *
 * @description 
 * Creates a jquery mobile slider on the given element.
 * 
 * @param {string=} ngModel Assignable angular expression to data-bind to.
 * @param {string=} disabled Whether this checkbox is disabled.
 * @param {string=} mini Whether this checkbox is mini.
 *
 * @example
<example module="jqm">
  <file name="index.html">
  <div jqm-slider min="-5" max="5" ng-model="slider.Value" ></div>
  My slider value is: {{slider.Value}}
  <div jqm-slider mini="true"  min="-5" max="5" ng-model="slider.Value2" ></div>
  My slider value is: {{slider.Value2}}
  </file>
</example>
 */
jqmModule.directive('jqmSlider', [function () {
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        priority: 1,
        template: '<%= inlineTemplate("templates/jqmSlider.html") %>',
        require: ['^?ngModel'],
        scope: {
            disabled: '@',
            mini: '@',
            min: '@',
            max: '@',
            step: '@'
        },
        controller: function ($scope){
            if ($scope.disabled && $scope.disabled.length > 0) {
            $scope.disabled = true;
            }
            $scope.sliderValue = {};
            this.$scope = $scope;
        },
        link: function(scope, element, attr, ctrls) {
            var ngModelCtrl = ctrls[0];

            if (ngModelCtrl) {
            ngModelCtrl.$formatters.push(function (value) {
                if (value === undefined || isNaN(value)) {
                ngModelCtrl.$setViewValue(scope.sliderValue);
                } else {
                scope.sliderValue = value;
                }
                return scope.sliderValue;
            });

            ngModelCtrl.$parsers.push(function (value) {
                //this condition is to correct phantom model reset
                if (value === undefined && scope.sliderValue !== undefined) {
                return scope.sliderValue;
                }
                return value;
            });
            }
        }
    };
}]);
