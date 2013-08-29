jqmModule.directive('jqmLiLink', [function() {
    var isdef = angular.isDefined;
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        templateUrl: 'templates/jqmLiLink.html',
        controller: ['$scope', JqmLiController],
        scope: {
            icon: '@',
            iconpos: '@',
            iconShadow: '@',
            link: '@jqmLiLink',
            //hasThumb and hasCount set by jqmLiCount and jqmLiThumb
        },
        compile: function(element, attr) {
            attr.icon = isdef(attr.icon) ? attr.icon : 'ui-icon-arrow-r';
            attr.iconpos = isdef(attr.iconpos) ? attr.iconpos : 'right';
            attr.iconShadow = isdef(attr.iconShadow) ? attr.iconShadow : true;
        }
    };
    function JqmLiController($scope) {
        this.$scope = $scope;
    }
}]);
