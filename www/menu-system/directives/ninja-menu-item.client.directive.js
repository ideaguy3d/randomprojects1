'use strict';

angular.module('ngfireApp').directive('ninjaMenuItem', [
    function () {
        return {
            templateUrl: 'menu-system/views/ninja-item.html',
            restrict: 'E',
            require: '^ninjaMenu',
            transclude: true,
            scope: {
                label: '@',
                icon: '@',
                uistate: '@'
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
                        //TODO: try to implement this as a getter setter in a .factory() to see if it's faster
                        ctrl.setState(scope.uistate);
                    });
                });
            }
        };
    }
]);