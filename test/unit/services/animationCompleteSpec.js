
"use strict";
describe('animationComplete', function() {
    var $sniffer;
    it('throws an exception if the browser does not support css animations', inject(function($animationComplete, $sniffer) {
        $sniffer.animations = false;
        expect(function() {
            $animationComplete();
        }).toThrow();
    }));
    it('binds to animationend if no vendorPrefix exists', inject(function($animationComplete, $sniffer) {
        var el = angular.element('<div></div>'),
            spy = jasmine.createSpy();
        $sniffer.animations = true;
        $sniffer.vendorPrefix = '';
        spyOn(el, 'on');
        $animationComplete(el, spy);
        expect(el.on).toHaveBeenCalledWith('animationend', spy);
    }));
    it('binds to prefixed animationend if vendorPrefix exists', inject(function($animationComplete, $sniffer) {
        var el = angular.element('<div></div>'),
            spy = jasmine.createSpy();
        $sniffer.animations = true;
        $sniffer.vendorPrefix = 'Webkit';
        spyOn(el, 'on');
        $animationComplete(el, spy);
        expect(el.on).toHaveBeenCalledWith('animationend webkitAnimationEnd', spy);
    }));
    it('should support once binding', inject(function($animationComplete, $sniffer) {
        var el = angular.element('<div></div>');
        var spy = jasmine.createSpy('callback');

        $sniffer.animations = true;
        $sniffer.vendorPrefix = '';

        spyOn(el, 'off').andCallThrough();
        spyOn(el, 'on').andCallThrough();

        $animationComplete(el, spy, true);
        expect(el.on.mostRecentCall.args[0]).toMatch('animationend');
        el.triggerHandler('animationend');
        expect(el.off.mostRecentCall.args[0]).toMatch('animationend');
        expect(spy).toHaveBeenCalled();

        spy.reset();
        el.triggerHandler('animationend');
        expect(spy).not.toHaveBeenCalled();
    }));
    it('returns a function to unbind', inject(function($animationComplete, $sniffer) {
        var el = angular.element('<div></div>');
        var spy = jasmine.createSpy('callback');

        $sniffer.animations = true;
        $sniffer.vendorPrefix = 'Webkit';

        spyOn(el, 'off').andCallThrough();
        spyOn(el, 'on').andCallThrough();

        var removeCb = $animationComplete(el, spy);
        expect(el.off).not.toHaveBeenCalled();
        removeCb();
        expect(el.off).toHaveBeenCalledWith('animationend webkitAnimationEnd', spy);
    }));
});
