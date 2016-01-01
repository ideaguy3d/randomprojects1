'use strict';

angular.module('ngfireApp').directive('voteWidget', [
	function() {
		return {
			templateUrl: 'core/views/template-votewidget.html',
			restrict: 'E',
			scope: {
				voteup: '&',
                votedown: '&',
                count: '='
			}
		};
	}
]);