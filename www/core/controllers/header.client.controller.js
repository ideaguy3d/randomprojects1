'use strict';

angular.module('ngfireApp').controller('HeaderController',
    ['$scope', '$rootScope', '$window', '$timeout', '$location',
        function ($scope, $rootScope, $window, $timeout, $location) {

            $scope.title = "Ninja Game Publishers";
            $scope.subtitle = "rate publishers by rating their games";
            var star = true, zLogo;
            zLogo = star ? 'core/css/ninja_star.png' : 'core/img/art1.png';
            $scope.ninja_icon = zLogo;
            $scope.isMenuButtonVisible = true;
            $scope.isMenuVisible = true;
            $scope.isMenuHorizontal = true;
            $scope.menuOffButton= true;
            $scope.menu = [];

            $scope.$on('ninja-menu-orientation-changed-event', function (event, data) {
                $scope.isMenuHorizontal = data.isMenuHorizontal;
                $scope.style4vert = data.isMenuHorizontal ? {'z-index':'1030'} : {'z-index':'1', 'width':'200px'};

                //this fix's issue w/contents edge going off screen, we call $timeout
                //because when this event is called we're in the middle of a digest cycle
                //so we can't do another apply, so we trigger this event imm! after a
                //digest cycle.
                $timeout(function () {
                    $($window).trigger('resize');
                }, 0);
            });

            //$($window).on('resize.ninjaMenu', function () {
            //    //let angular know our scope is going to change
            //    $scope.$apply(function () {
            //        checkWidth();
            //        broadcastState();
            //    });
            //});

            $scope.$on('ninja-menu-button-clicked', function (event, data) {
                $scope.isMenuVisible = data.menuVisible;
                $scope.menuOffButton = data.menuOffButton;
                console.log("$scope.$on('ninja-menu-button-clicked', $scope.menuOffButton = "+$scope.menuOffButton);
            });

            //TODO: check this methods' results
            $scope.$on('$destroy', function () {
                $($window).off('resize.ninjaFramework');
            });

            $scope.menuOffButtonClicked = function () {
                $scope.isMenuVisible = !$scope.isMenuVisible;
                $scope.menuOffButton = !$scope.menuOffButton;
                //$scope.menuOffButton = !$scope.menuOffButton;
                //$scope.$apply();
                //broadcastState();
            };

            var checkWidth = function () {
                var width = Math.max($($window).width(), $($window).innerWidth());
                $scope.isMenuVisible = (width > 768);
                $scope.isMenuButtonVisible = !$scope.isMenuVisible;
            };

            var broadcastState = function () {
                $rootScope.$broadcast('ninja-menu-show', {
                        show: $scope.isMenuVisible,
                        isVertical: $scope.isMenuVertical,
                        allowHorizontalToggle: !$scope.isMenuButtonVisible
                    }
                );
            };

        }
    ]);