'use strict';

angular.module('menu-system').directive('ninjaMenu', ['$timeout',
    function ($timeout) {
        return {
            templateUrl: 'modules/menu-system/views/ninja-menu.html',
            restrict: 'E',
            transclude: true,
            controller: 'NinjaMenuController',
            scope: {},
            link: function(scope, element, attrs) {
                var item = element.find('.ninja-selectable-item:first');
                //console.log(item);
                $timeout(function () {
                    item.trigger('click');
                });
            }
        };
    }
]);