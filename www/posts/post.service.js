/**
 * Created by Julius Hernandez on 10/15/2015.
 */

angular.module('ngfireApp').factory('Post',
    ['$firebaseArray', '$firebaseObject', 'FirepostUrl',
    function ($firebaseArray, $firebaseObject, FirepostUrl) {
        var ref = new Firebase(FirepostUrl);
        var posts = $firebaseArray(ref.child('posts'));
        var comments = $firebaseArray(ref.child('comments'));

        return {
            all: posts,
            allComments: comments, //figure out how to query & do custom stuff w/this for practice
            create: function (post) {
                return posts.$add(post);
            },
            get: function (postId) {
                return $firebaseObject(ref.child('posts').child(postId));
            },
            delete: function (post) {
                return posts.$remove(post);
            },
            comments: function (postId) {
                return $firebaseObject(ref.child('comments').child(postId));
            }
        }
    }]
);