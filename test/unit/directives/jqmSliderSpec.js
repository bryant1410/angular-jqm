"use strict";
describe(' jqmSlider directive', function() {
    var ng, jqm, ngElement, jqmElement;
    beforeEach(function() {
        ng = testutils.ng;
        jqm = testutils.jqm;
    });

    describe(' markup compared to jqm', function() {
        function compileAndCompare(opt, opt2) {
            opt2 = opt2 || opt;
            ngElement = ng.init('<input type="range" min="-5" max="5" value="0" jqm-slider '+opt+'/>');
            //ngElement = ng.init('<div jqm-slider type="range" min="-5" max="5" > '+opt+'/></div>');
            jqmElement = jqm.init('<input type="range" min="-5" max="5" value="0" '+opt2+'/>');
            testutils.compareElementRecursive(ngElement, jqmElement);
        }
        it(' has same markup without options', function() {
            compileAndCompare('');
        });
        it(' has same markup with min/max options', function() {
            compileAndCompare('min="-5" max="5"','"min="-5" max="5"');
        });
        it(' has same markup when disabled', function() {
            compileAndCompare('disabled="disabled"','disabled="disabled"');
        });
        it(' has same markup when mini', function() {
            compileAndCompare('mini="true"','mini="true"');
        });
        it(' has same markup with custom theme', function() {
            compileAndCompare('jqm-theme="someTheme"','data-theme="someTheme"');
        });
    });

    describe('details', function() {
        it('works with ng-model without using $parent', function() {
            ngElement = ng.init('<div ng-init="model=2;"><input type="range" min="-5" max="5" value="0" jqm-slider ng-model="model"/></div>');
            expect(ngElement.scope().model).toEqual(2);
        });
        it('sets model value in scope if not defined', function() {
            ngElement = ng.init('<div ng-init=""><input type="range" min="-5" max="5" value="0" jqm-slider ng-model="model"/></div>');
            expect(ngElement.scope().model).toBe(0);
        });
        it('has default values', function() {
            ngElement = ng.init('<div ng-init=""><input jqm-slider ng-model="model"/></div>');
            expect(ngElement.scope().model).toEqual(50);
        });
    });
});


