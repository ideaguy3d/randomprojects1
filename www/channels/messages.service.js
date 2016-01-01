/**
 * Created by Julius Hernandez on 10/3/2015.
 */
angular.module('ngfireApp').factory('Messages',
    ['$firebaseArray', 'FirebaseUrl',
        function ($firebaseArray, FirebaseUrl) {

            var refChannelMessage = new Firebase(FirebaseUrl + 'channelMessage');
            var refUserMessage = new Firebase(FirebaseUrl+'userMessages');

            return {
                forChannel: function (channelId) {
                    //console.log("from Messages service, channelId = "+channelId);
                    return $firebaseArray(refChannelMessage.child(channelId));
                },
                forUsers: function (uid1, uid2) {
                    //the user w/the lower id will hold the convo w/anyone w/a higher id.
                    var path  = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;
                    //this'll help ensure users are pulling from the right path in firebase
                    console.log("forUsers called from messages.service");
                    return $firebaseArray(refUserMessage.child(path));
                }
            };
        }
    ]
);