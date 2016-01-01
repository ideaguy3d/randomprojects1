/**
 * Created by Julius Hernandez on 10/1/2015.
 */

angular.module('ngfireApp')
    .controller('AuthCtrl', ['Auth', '$state', 'Users', 'md5',
        function (Auth, $state, Users, md5) {//$state to use .go() to auto send users to a different page
            //to use 'controller as' syntax
            var authCtrl = this;

            authCtrl.user = {
                //this'll be tied an ngModel that'll auto fill this obj
                email: '',
                password: ''
            };

            authCtrl.login = function () {
                //console.log("user.email = "+authCtrl.user.email+", user.password = "+authCtrl.user.password);
                Auth.authRef.$authWithPassword(authCtrl.user)
                    .then(function (auth) {//login did succeed
                        $state.go('channels');
                    }, function (error) {//login did NOT succeed
                        authCtrl.error = error;
                    });
            };

            authCtrl.register = function () {
                Auth.authRef.$createUser(authCtrl.user).then(function (user) {
                    //authCtrl.user will still be pre-filled so there will be a match
                    authCtrl.login();
                }, function (error) {
                    authCtrl.error = error;
                });
            };

            authCtrl.registerAnonymously = function () {
                Auth.$authAnonymously().then(function (authData) {
                    //manually give anonymous user an email, pw, displayName & .$id
                    Auth.$createUser({email: authData.uid+"@ninjaguest.app", password:"temp"+authData.uid})
                        .then(function (anonUserData) {
                            anonUserData.displayName = anonUserData.uid+"@ninjaguest.app";
                            //anonUserData.$id = anonUserData.uid;
                            anonUserData.emailHash = "anonymous_user";
                            Users.all.$add(anonUserData);
                        });
                    $state.go('profile');
                }).catch(function (error) {
                    console.log('authCtrl.registerAnonymously() failed:: ' + error);
                });
            };
        }]
);








