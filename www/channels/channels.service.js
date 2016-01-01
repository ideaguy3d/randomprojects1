/**
 * Created by Julius Hernandez on 10/3/2015.
 */

angular.module('ngfireApp')
    .factory('Channels',
    ['$firebaseArray', 'FirebaseUrl',
        function ($firebaseArray, FirebaseUrl) {
            var ref = new Firebase(FirebaseUrl + 'channels');
            return $firebaseArray(ref);
        }
    ]
);