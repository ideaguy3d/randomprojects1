/**
 * Created by Julius Hernandez on 10/1/2015.
 */
angular.module('ngfireApp').factory('Auth',
    ['$firebaseAuth', 'FirebaseUrl',
    function ($firebaseAuth) {
        var ref = new Firebase('https://juliusproto.firebaseio.com/');
        var firebAuthRef = $firebaseAuth(ref);

        return  {
            authRef : firebAuthRef,
            authUserData: firebAuthRef.$getAuth()
        };
    }]
);






