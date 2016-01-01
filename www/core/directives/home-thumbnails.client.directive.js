'use strict';

angular.module('ngfireApp').directive('publisherThumbnail', [
    function () {
        return {
            templateUrl: 'core/views/template-thumbnail.html',
            restrict: 'E',
            controller: 'HomeController',
            scope: {
                publisher: "="
            }
        };
    }
]);