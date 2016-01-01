/**
 * Created by Julius Hernandez on 10/15/2015.
 */

angular.module('ngfireApp').controller("PostsController",
    ['$scope', 'Post', '$state', 'Auth', 'Users',
    function($scope, Post, $state, Auth, Users) {
        $scope.posts = Post.all;
        $scope.intro = "Type something (: ";
        $scope.post = {url: 'http://', title:''};
        var authUid = Auth.authUserData ? Auth.authUserData.uid : null;

        Auth.authRef.$onAuth(function (authData) {
            $scope.userName = authUid ? Users.getProfile(authUid) : null;
        });



        $scope.submitPost = function () {
            Post.create($scope.post).then(function (ref) {
                //ref is a fireb db sub node
                console.log(".create success, ref = "+ref);
                $scope.post = {url: 'http://', title: ''};
            });
        };

        $scope.deletePost = function (post) {
            Post.delete(post);
        }
    }]
);



//$scope.submitPost = function () {
//    Post.create($scope.post).then(function (ref) {
//        $state.go('indie_devs.posts_details');
//    });
//};