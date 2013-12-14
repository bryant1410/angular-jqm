jqmModule.factory('$animationComplete', ['$sniffer', function ($sniffer) {
  return function (el, callback, once) {
    var eventNames = 'animationend';
    if (!$sniffer.animations) {
      throw new Error("Browser does not support css animations.");
    }
    if ($sniffer.vendorPrefix) {
      eventNames += " " + $sniffer.vendorPrefix.toLowerCase() + "AnimationEnd";
    }
    var _callback = callback;
    if (once) {
      callback = function() {
        unbind();
        _callback();
      };
    }
    el.on(eventNames, callback);

    return unbind;

    function unbind() {
      el.off(eventNames, callback);
    }
  };
}]);
