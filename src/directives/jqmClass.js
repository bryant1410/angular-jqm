jqmModule.directive('jqmClass', [function() {
  return {
    link: function(scope, element, attr) {
      var oldVal;

      scope.$watch(attr.jqmClass, jqmClassWatchAction, true);

      attr.$observe('class', function(value) {
        var jqmClass = scope.$eval(attr.jqmClass);
        jqmClassWatchAction(jqmClass);
      });

      function jqmClassWatchAction(newVal) {
        if (!equals(newVal, oldVal)) {
          element.removeClass(getClassString(oldVal));
          element.addClass(getClassString(newVal));
          oldVal = newVal;
        }
      }

      function getClassString(classVal) {
        if (isObject(classVal) && !isArray(classVal)) {
          var classes = [];
          forEach(classVal, function(v, k) {
            if (v) { classes.push(k); }
          });
          classVal = classes;
        }
        return isArray(classVal) ? classVal.join(' ') : classVal;
      }
    }
  };
}]);
