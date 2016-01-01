/**
 * Created by Julius Hernandez on 10/15/2015.
 */

angular.module('ngfireApp').controller('PostDetailsController',
    ['Post', '$stateParams', '$scope', 'Auth', 'Users',
    function (Post, $stateParams, $scope, Auth, Users) {
        $scope.post = Post.get($stateParams.postId);
        $scope.comments = Post.comments($stateParams.postId);

        $scope.signedIn = Auth.authUserData !== null;

        $scope.getUser = function () {
            if($scope.signedIn) {
                $scope.user = Users.getDisplayName(Auth.authUserData.uid || null);
            } else {
                $scope.user = "guest user";
            }
        };


        $scope.addComment = function () {
            console.log("$scope.commentText = "+$scope.commentText);
            if(!$scope.commentText || $scope.commentText === '') {
                return;
            }
            var comment = {
                text: $scope.commentText,
                creator: $scope.user,
                userId: $scope.user.$id
            };
            $scope.comments.$add(comment);
            $scope.commentText = '';
        };

        $scope.deleteComment = function (comment) {
            $scope.comments.$remove(comment);
        }
    }]
);