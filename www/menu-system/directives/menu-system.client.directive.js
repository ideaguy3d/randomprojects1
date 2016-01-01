'use strict';

angular.module('ngfireApp').directive('jmenuSystem', [
	function() {
		return {
			templateUrl: 'menu-system/views/menu-system-template.html',
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