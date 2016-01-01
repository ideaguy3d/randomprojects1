'use strict';

angular.module('menu-system').directive('jmenuSystem', [
	function() {
		return {
			templateUrl: 'modules/menu-system/views/menu-system-template.html',
			restrict: 'E',
			controller: 'HeaderController',
            transclude: true,
			scope: {
                title:'@',
                subtitle:'@',
                iconFile: '@'
            }
		};
	}
]);