describe('jqmInputWrapper', function() {
  var ngElement, jqmElement;
  beforeEach(function() {
    ng = testutils.ng;
    jqm = testutils.jqm;
  });

  function compare() {
    testutils.compareElementRecursive(ngElement, jqmElement, /ui-input-clear-hidden/); //we use ng-show
  }

  describe("markup compared to jqm type='search'", function() {
    function setup(attrs, value) {
      ngElement = ng.init('<label class="ui-input-text">'+(value||'')+'</label>' +
                          '<div jqm-input-wrapper><input type="search" '+(attrs||'')+'></div>');
      jqmElement = jqm.init('<label for="jqminput">'+(value||'')+'</label>' +
                            '<input id="jqminput" type="search" '+(attrs||'')+'>');

    }
    it('with regular attrs', function() {
      setup('clear-btn="true"', 'text');
      compare();
    });
    it('with text inputted', function() {
      setup('type="search" clear-btn="true"', 'text');
      ngElement.find('input').val('someVal').triggerHandler('input');
      jqmElement.find('input').val('someVal').triggerHandler('input');
      ng.scope.$apply();
      compare();
    });
    it('with text inputted and clear button clicked', function() {
      setup('type="search" clear-btn="true"', 'text');
      ngElement.find('input').val('someVal').triggerHandler('input');
      jqmElement.find('input').val('someVal').triggerHandler('input');
      ngElement.find('.ui-btn').triggerHandler('click');
      jqmElement.find('.ui-btn').click();
      compare();
    });
  });
  describe("markup compared to jqm type='text'", function() {
    function setup(attrs, value) {
      ngElement = ng.init('<label class="ui-input-text">'+(value||'')+'</label>' +
                          '<div jqm-input-wrapper><input '+(attrs||'')+'></div>');
      jqmElement = jqm.init('<label for="jqminput">'+(value||'')+'</label>' +
                            '<input id="jqminput" '+(attrs||'')+'>');

    }
    it('with regular attrs', function() {
      setup('type="text"', 'some label');
      compare();
    });
  });

  describe('ng wrapper tests', function() {
    var input;
    beforeEach(module(function($compileProvider) {
      input = {};
      $compileProvider.directive('consume', function() {
        return {
          require: 'jqmInputWrapper',
          link: function(scope, elm, attr, ctrl) {
            ctrl.$scope.input = input;
          }
        };
      });
    }));
    var scope, el, wrapScope;
    function setup(attrs) {
      inject(function($compile, $rootScope) {
        scope = $rootScope.$new();
        el = $compile('<div jqm-input-wrapper ' + (attrs||'') + ' consume></div>')(scope);
        scope.$apply();
      });
    }
    it('should have ui-mini', function() {
      setup();
      expect(el).not.toHaveClass('ui-mini');
      input.mini = true;
      scope.$apply();
      expect(el).toHaveClass('ui-mini');
    });
    it('should have ui-input-search', function() {
      setup();
      expect(el).not.toHaveClass('ui-input-search ui-btn-corner-all ui-icon-searchfield');
      input.isSearch = function() { return true; };
      scope.$apply();
      expect(el).toHaveClass('ui-input-search ui-btn-corner-all ui-icon-searchfield');
    });
    it('should have ui-input-text', function() {
      setup();
      expect(el).not.toHaveClass('ui-input-text ui-corner-all');
      input.isText = function() { return true; };
      scope.$apply();
      expect(el).toHaveClass('ui-input-text ui-corner-all');
    });
    it('should have ui-checkbox', function() {
      setup();
      expect(el).not.toHaveClass('ui-checkbox');
      input.isCheckbox = function() { return true; };
      scope.$apply();
      expect(el).toHaveClass('ui-checkbox');
    });
    it('should have ui-body-$theme', function() {
      setup('jqm-theme="elephant"');
      expect(el).toHaveClass('ui-body-elephant');
    });
  });

  describe('ng input tests', function() {
    var scope, el, button, input, inputScope;
    function setup(attr) {
      inject(function($compile, $rootScope) {
        scope = $rootScope.$new();
        el = $compile('<div jqm-input-wrapper><input '+(attr||'')+'></div>')(scope);
        scope.$apply();
        input = el.find('input');
        inputScope = input.isolateScope();
        button = jqLite(el[0].querySelector('.ui-btn'));
      });
    }
    it('should add clear button', function() {
      setup('clear-btn="true"');
      expect(button.length).toBe(1);
      expect(button).toHaveClass('ui-btn ui-input-clear');
    });
    it('should on button click: clear, focus, call clear-btn()', function() {
      setup('clear-btn="myFn()" ng-model="$root.supermodel"');

      input[0].focus = jasmine.createSpy();
      scope.myFn = jasmine.createSpy();
      scope.$apply('$root.supermodel = "pretty"');
      expect(input.val()).toBe('pretty'); //sanity

      button.triggerHandler('click');

      expect(input.val()).toBe('');
      expect(scope.supermodel).toBe('');
      expect(scope.myFn).toHaveBeenCalled();
      expect(input[0].focus).toHaveBeenCalled();
    });
  });
});
