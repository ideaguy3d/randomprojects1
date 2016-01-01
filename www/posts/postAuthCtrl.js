/**
 * Created by Julius Hernandez on 10/16/2015.
 */
angular.module('ngfireApp').controller('PostAuthController',
    ['$scope', '$location', 'Auth', 'user',
    function ($scope, $location, PostAuth, user) {
        if(user){
            console.log("congrats, you're logged in "+user);
        }
        if(PostAuth.signedIn) {
            console.log("you are Auth.signedIn");
        }

        $scope.login = function () {
            PostAuth.login($scope.user);
        };

        $scope.register = function () {
            PostAuth.register($scope.user).then(function () {
                return PostAuth.login($scope.user);
            });
        }
    }]
);