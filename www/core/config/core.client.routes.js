'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider
            .state('publisher_details', {
                url: '/:publisher',
                templateUrl: 'core/views/template-publisher.html'
            }).
            state('indie_devs', {
                url: '/indie_devs',
                templateUrl: 'core/views/indie_devs.html'
            }).
            state('ninja_zone', {
                url: '/ninja_zone',
                templateUrl: 'modules/core/views/ninja_zone.html'
            });
    }
]);