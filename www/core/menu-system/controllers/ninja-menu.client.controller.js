'use strict';

angular.module('menu-system').controller('NinjaMenuController',
    ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $scope.showMenu = true;
            $scope.openMenuScope = null;
            $scope.isHorizontal = true;
            $scope.allowHorizontalToggle = true;
            $scope.menuVisible = true;
            $scope.menuOnButton = true;

            //for the menu item
            this.getActiveElement = function () {
                return $scope.activeElement;
            };

            //for the menu item
            this.setActiveElement = function (element) {
                //this keeps track of which element is active in our menu
                $scope.activeElement = element;
            };

            this.isHorizontal = function() {
                //console.log("this.isHorizontal() invoked");
                return $scope.isHorizontal;
            };


            // this'll mean that the menu is open. So now
            //we're taking control of its' scope, this'll be used by the menu item
            this.setOpenMenuScope = function (scope) {
                $scope.openMenuScope = scope;
            };

            $scope.toggleMenuOrientation = function () {
                if($scope.openMenuScope) $scope.openMenuScope.closeMenu();

                $scope.isHorizontal = !$scope.isHorizontal;

                $rootScope.$broadcast('ninja-menu-orientation-changed-event',
                    {isMenuHorizontal: $scope.isHorizontal});
            };

            $scope.menuButtonClicked = function () {
                var curVis = false;
                $rootScope.$broadcast('ninja-menu-button-clicked',
                    {menuVisible: curVis, menuOffButton: curVis});
                $scope.menuVisible = curVis;
            };

            //will look for a click event anywhere in the document to close the modal
            angular.element(document).bind('click', function (e) {
                //if the menu is open and the scope is not vertical
                if($scope.openMenuScope && $scope.isHorizontal){
                    //we have clicked inside the menu to it's okay stay open
                    if($(e.target).parent().hasClass('ninja-selectable-item')) return;

                    //we didn't click inside the menu so update ng so the menu will close
                    $scope.$apply(function () {
                        $scope.openMenuScope.closeMenu();
                    });

                    //make sure the click doesn't get passed to the elements around the menu
                    e.preventDefault();
                    e.stopPropagation();
                }
                //if the 'if' fails go ahead and propagate

            });

            $scope.$on('ninja-menu-show', function (event, data) {
                $scope.showMenu = data.show;
                $scope.isVertical = data.isVertical;
                $scope.allowHorizontalToggle = data.allowHorizontalToggle;
            });
        }//end of the controllers function
    ]);