/**
 * Created by Julius Hernandez on 10/16/2015.
 */

angular.module('ngfireApp').controller('SubNavController',
    ['$scope', '$location', 'Post', 'PostAuth',
    function ($scope, $location, Post, PostAuth) {
        $scope.signedIn = PostAuth.signedIn;
        $scope.logout = PostAuth.logout;


    }]
);