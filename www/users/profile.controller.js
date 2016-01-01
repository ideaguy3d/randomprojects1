/**
 * Created by Julius Hernandez on 10/2/2015.
 */
"use strict";
angular.module('ngfireApp')
    .controller('ProfileCtrl',
    //md5 is for gravatar
    ['$state', 'md5', 'auth', 'profile',
        function ($state, md5, auth, profile) {
            var profileCtrl = this;

            profileCtrl.profile = profile;

            //user should be on this page to update their profile. So lets add that functionality
            profileCtrl.updateProfile = function () {
                //this is our gravatar url, .password is coming from the fireb auth obj because
                //we're using pw based authentication. If we were using FaceBook we'd use .Facebook
                console.log("auth.profile = "+auth.profile);
                profileCtrl.profile.emailHash = auth.profile ? md5.createHash(auth.profile.email) : "anonymous_user";

                profileCtrl.profile.$save().then(function () {
                    $state.go('channels');
                });
            }
        }
    ]
);