'use strict';

angular.module('ngfireApp').directive('collapsible', [
	function() {
		return {
			templateUrl: 'core/views/template-collapsible.html',
			restrict: 'E',
			controller: function ($scope) {
                $scope.visible = true;
                $scope.toggleVisible = function () {
                    $scope.visible = !$scope.visible;
                }
            },
            transclude: true,
            scope: {
                title:'@'
            },
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);