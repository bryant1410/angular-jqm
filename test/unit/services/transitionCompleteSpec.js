
"use strict";
describe('transitionComplete', function() {
    var $sniffer;
    it('throws an exception if the browser does not support css animations', inject(function($transitionComplete, $sniffer) {
        $sniffer.animations = false;
        expect(function() {
            $transitionComplete();
        }).toThrow();
    }));
    it('binds to transitionend if no vendorPrefix exists', inject(function($transitionComplete, $sniffer) {
        var el = angular.element('<div></div>'),
            spy = jasmine.createSpy();
        $sniffer.animations = true;
        $sniffer.vendorPrefix = '';
        spyOn(el, 'on');
        $transitionComplete(el, spy);
        expect(el.on).toHaveBeenCalledWith('transitionend', spy);
    }));
    it('binds to prefixed transitionend if vendorPrefix exists', inject(function($transitionComplete, $sniffer) {
        var el = angular.element('<div></div>'),
            spy = jasmine.createSpy();
        $sniffer.animations = true;
        $sniffer.vendorPrefix = 'Webkit';
        spyOn(el, 'on');
        $transitionComplete(el, spy);
        expect(el.on).toHaveBeenCalledWith('transitionend webkitTransitionEnd', spy);
    }));
    it('should support once binding', inject(function($transitionComplete, $sniffer) {
        var el = angular.element('<div></div>');
        var spy = jasmine.createSpy('callback');

        $sniffer.animations = true;
        $sniffer.vendorPrefix = '';

        spyOn(el, 'off').andCallThrough();
        spyOn(el, 'on').andCallThrough();

        $transitionComplete(el, spy, true);
        expect(el.on.mostRecentCall.args[0]).toMatch('transitionend');
        el.triggerHandler('transitionend');
        expect(el.off.mostRecentCall.args[0]).toMatch('transitionend');
        expect(spy).toHaveBeenCalled();

        spy.reset();
        el.triggerHandler('transitionend');
        expect(spy).not.toHaveBeenCalled();
    }));
    it('returns a function to unbind', inject(function($transitionComplete, $sniffer) {
        var el = angular.element('<div></div>');
        var spy = jasmine.createSpy('callback');

        $sniffer.animations = true;
        $sniffer.vendorPrefix = 'Webkit';

        spyOn(el, 'off').andCallThrough();
        spyOn(el, 'on').andCallThrough();

        var removeCb = $transitionComplete(el, spy);
        expect(el.off).not.toHaveBeenCalled();
        removeCb();
        expect(el.off).toHaveBeenCalledWith('transitionend webkitTransitionEnd', spy);
    }));
});
