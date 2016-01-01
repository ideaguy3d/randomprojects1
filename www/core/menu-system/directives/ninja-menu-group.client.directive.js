'use strict';

angular.module('menu-system').directive('ninjaMenuGroup', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Ninja menu group directive logic
				// ...

				element.text('this is the ninjaMenuGroup directive');
			}
		};
	}
]);