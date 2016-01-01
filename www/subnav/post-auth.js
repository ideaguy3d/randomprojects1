/**
 * Created by Julius Hernandez on 10/16/2015.
 */

angular.module('ngfireApp').factory('PostAuth',
    ['$firebaseSimpleLogin', 'FirepostUrl', '$rootScope',
    function ($firebaseSimpleLogin, FirepostUrl, $rootScope) {
        var ref = new Firebase(FirepostUrl);
        var auth = $firebaseSimpleLogin(ref);

        var Auth = {
            register: function (user) {
                return auth.$createUser(user.email, user.password);
            },
            login: function (user) {
                return auth.$login('password', user);
            },
            logout: function () {
                auth.$logout();
            },
            resolveUser: function() {
                return auth.$getCurrentUser();
            },
            signedIn: function() {
                console.log("Auth.user.provider = "+Auth.user.provider);
                console.log("!Auth.user.provider = "+!Auth.user.provider);
                console.log("!!Auth.user.provider = "+!!Auth.user.provider);
                return !!Auth.user.provider;
            },
            user: {}
        };

        $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
            console.log('j, logged in');
            angular.copy(user, Auth.user);
        });

        $rootScope.$on('$firebaseSimpleLogin:logout', function() {
            console.log('j, logged out');
            angular.copy({}, Auth.user);
        });

        return Auth;
    }]
);