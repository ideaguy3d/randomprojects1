'use strict';

angular.module('menu-system').directive('ninjaMenuItem', [
    function () {
        return {
            templateUrl: 'modules/menu-system/views/ninja-item.html',
            restrict: 'E',
            require: '^ninjaMenu',
            transclude: true,
            scope: {
                label: '@',
                icon: '@',
                route: '@'
            },
            link: function(scope, element, attrs, ctrl) {
                scope.isActive = function(){
                  return element === ctrl.getActiveElement();
                };

                scope.isItemHorizontal = function () {
                    return ctrl.isHorizontal() || element.parents('.ninja-subitem-section').length > 0;
                };

                element.on('click', function (event) {
                    event.stopPropagation();
                    scope.$apply(function () {
                        ctrl.setActiveElement(element);
                        //ctrl.setRoute(scope.route);
                    });
                });
            }
        };
    }
]);