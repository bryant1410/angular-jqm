jqmModule.run(['jqmButtonToggler', '$rootElement', function(jqmButtonToggler, $rootElement) {
  jqmButtonToggler($rootElement);
}]);
jqmModule.factory('jqmButtonToggler', function() {

  return function(element) {
    var self = {};

    //Exposed for testing
    self.$mousedown = function(e) {
      var offEventNames = e.type === 'mousedown' ?
        'mouseup mousemove' :
        'touchmove touchend touchcancel';
      var target = jqLite(e.target);
      var btnElement = parentWithClass(target, 'ui-btn-up-' + target.scope().$theme);
      if (btnElement) {
        toggleBtnDown(btnElement, true);
        target.on(offEventNames, onBtnUp);
      }
      function onBtnUp() {
        toggleBtnDown(btnElement, false);
        target.off(offEventNames, onBtnUp);
      }
    };

    //Exposed for testing
    self.$mouseover = function(e) {
      var target = jqLite(e.target);
      var btnElement = parentWithClass(target, 'ui-btn');
      if (btnElement && !btnElement.hasClass('ui-btn-down-' + target.scope().$theme)) {
        toggleBtnHover(btnElement, true);
        target.on('mouseout', onBtnMouseout);
      }
      function onBtnMouseout() {
        toggleBtnHover(btnElement, false);
        target.off('mouseout', onBtnMouseout);
      }
    };

    element[0].addEventListener('touchstart', self.$mousedown, true);
    element[0].addEventListener('mousedown', self.$mousedown, true);
    element[0].addEventListener('mouseover', self.$mouseover, true);

    return self;

    function toggleBtnDown(el, isDown) {
      var theme = (el.isolateScope() || el.scope()).$theme;
      el.toggleClass('ui-btn-down-' + theme, isDown);
      el.toggleClass('ui-btn-up-' + theme, !isDown);
    }
    function toggleBtnHover(el, isHover) {
      var theme = (el.isolateScope() || el.scope()).$theme;
      el.toggleClass('ui-btn-hover-' + theme, isHover);
    }
    function parentWithClass(el, className) {
      var maxDepth = 5;
      var current = el;
      while (current.length && maxDepth--) {
        if (current.hasClass(className)) {
          return current;
        }
        current = current.parent();
      }
      return null;
    }

  };
});
