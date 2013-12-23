jqmModule.directive('jqmInputText', ['$compile', '$timeout', function($compile, $timeout) {
  var clearButtonTemplate = '<a jqm-button ng-show="showClearButton()" class="ui-input-clear ui-fullsize" iconpos="notext" icon="ui-icon-delete" ng-click="clearButtonAction()">clear text</a>';
  return {
    restrict: 'A',
    require: ['?ngModel', '^?jqmInputWrapper'],
    scope: {
      type: '@',
      mini: '@',
      clearBtn: '&',
    },
    link: function(scope, element, attr, ctrls) {
      var tagName = element[0].tagName.toLowerCase();
      if (tagName != 'input') {
        throw new Error('jqmInputText must be an <input>. Instead, is ' +
                        ' <' + tagName + '>!');
      }

      var ngModelCtrl = ctrls[0];
      var wrapperCtrl = ctrls[1];
      var hasClearButton = isDefined(attr.clearBtn);

      if (hasClearButton) {
        element.after( $compile(clearButtonTemplate)(scope) );
      }
      if (wrapperCtrl) {
        wrapperCtrl.$scope.input = scope;
      }
      setClasses();

      element.on('focus', function() { $timeout(onFocus); });
      element.on('blur', function() { $timeout(onBlur); });

      attr.$observe('disabled', disabledWatchAction);
      attr.$observe('class', setClasses);

      scope.showClearButton = showClearButton;
      scope.clearButtonAction = clearButtonAction;

      function onFocus() {
        scope.isFocused = true;
        setClasses();
      }
      function onBlur() {
        scope.isFocused = false;
        setClasses();
      }

      function disabledWatchAction(newValue) {
        scope.disabled = !!newValue;
        setClasses();
      }
      function setClasses() {
        element.toggleClass('ui-input-text ui-body-' + scope.$theme,
                         !!(scope.type != 'checkbox' && scope.type != 'radio'));
        //If we're under a wrapper, we apply focus classes to that. else, we apply them here
        if (!wrapperCtrl) {
          element.toggleClass('mobile-textinput-disabled ui-state-disabled', !!scope.disabled);
          element.toggleClass('ui-focus', !!scope.isFocused);
          element.addClass('ui-corner-all ui-shadow-inset');
        }
      }

      function isSearch() {
        return scope.type === 'search';
      }
      function isText() {
        return scope.type !== 'search' && scope.type !== 'checkbox' && scope.type !== 'radio';
      }

      function showClearButton() {
        return hasClearButton && element.val();
      }
      function clearButtonAction() {
        if (ngModelCtrl) {
          ngModelCtrl.$setViewValue('');
        }
        element.val('');
        (scope.clearBtn || noop)();
        //focus input again after user clicks the btn
        element[0].focus();
      }

    }
  };
}]);
