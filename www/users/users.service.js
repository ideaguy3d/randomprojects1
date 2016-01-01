/**
 * Created by Julius Hernandez on 10/2/2015.
 */
angular.module('ngfireApp').factory('Users',
    ['$firebaseArray', '$firebaseObject', 'FirebaseUrl',
        function ($firebaseArray, $firebaseObject, FirebaseUrl) {
            var usersRef = new Firebase(FirebaseUrl + 'users');
            var users = $firebaseArray(usersRef);
            var connectedRef = new Firebase(FirebaseUrl + '.info/connected');

            return {
                getProfile: function (uid) {
                    //console.log("$firebaseObject(usersRef.child(uid)) = "+$firebaseObject(usersRef.child(uid)).displayName );
                    return $firebaseObject(usersRef.child(uid));
                },
                getDisplayName: function (uid) {
                    //.$getRecord is a convenience method for fireb arrays
                    return users.$getRecord(uid).displayName;
                },
                getGravatar: function (uid) {
                    if(users.$getRecord(uid).emailHash){
                        return '//www.gravatar.com/avatar/' +
                            users.$getRecord(uid).emailHash;
                    } else {
                        return '//www.gravatar.com/avatar/';
                    }
                },
                setOnline: function (uid) {
                    var connected = $firebaseObject(connectedRef);
                    var online = $firebaseArray(usersRef.child(uid + '/online'));

                    connected.$watch(function () {
                        if(connected.$value === true){
                            online.$add(true).then(function (connectedRef) {
                                //if user closes tab we want that to be reflected
                                connectedRef.onDisconnect().remove();
                            })
                        }
                    });
                },
                all: users,
                usersDb: usersRef
            };
        }
    ]
);