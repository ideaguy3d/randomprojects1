'use strict';

/**
 * @ngdoc overview
 * @name angularfireApp
 * @description
 * # angularfireApp
 *
 * Main module of the application.
 */
angular.module('ngfireApp',
    ['ngTouch', 'ngCookies', 'ngResource', 'ngSanitize', 'firebase', 'angular-md5', 'ngAnimate', 'ui.router',
        'ui.bootstrap', 'ui.utils'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                templateUrl: 'home/home.html'
            })
            .state('login', {
                url: '/login',
                controller: 'AuthCtrl as auth',
                //resolve just ensures that if we are logged in we're going to redirect
                //to the homepage.
                resolve: {
                    //requireAuth: function ($state, Auth) {
                    //    return Auth.authRef.$requireAuth().then(function (auth) {
                    //        $state.go('channels');
                    //    }, function (error) {
                    //        console.log(".state('login',...) error in 'requireAuth:: " + error);
                    //    });
                    //}
                },
                templateUrl: 'auth/login.html'
            })
            .state('register', {
                url: '/register',
                controller: 'AuthCtrl as auth',
                //resolve just ensures that if we are logged in we're going to redirect
                //to the homepage.
                resolve: {
                    //requireAuth: function ($state, Auth) {
                    //    return Auth.authRef.$requireAuth().then(function (auth) {
                    //        $state.go('channels');
                    //    }, function (error) {
                    //        console.log(".state(register) error in requireAuth:: " + error);
                    //    });
                    //}
                },
                templateUrl: 'auth/register.html'
            })
            .state('profile', {
                //rem.when we enter this state we're already logged in which means
                //we have a display we can edit. Currently this state only edits the username of the user
                url: '/profile',
                controller: 'ProfileCtrl as profile',
                templateUrl: 'users/profile.html',
                resolve: {
                    auth: function ($state, Users, Auth) {
                        //.catch is shorthand for handling promises we don't want to provide
                        //a success handler for. i.e. if they're not authenticated we want to
                        //send them home.
                        return Auth.authRef.$requireAuth().catch(function () {//we have to use .catch() because
                            //promise will get rejected if the user is not authenticated
                            $state.go('home');
                        });
                    },
                    profile: function (Users, Auth) {
                        return Auth.authRef.$requireAuth().then(function (auth) {
                            //.$loaded returns a promise that gets resolved when fb data is available locally
                            console.log(".state(profile) resolve.profile, auth.uid = " + auth.uid);
                            return Users.getProfile(auth.uid).$loaded();
                        });
                    }
                }
            })
            .state('channels', {
                url: '/channels',
                controller: 'ChannelCtrl as channel',
                resolve: {//resolve these 2 dependencies.
                    channels: function (Channels) {
                        //this 'promises' the firebaseArray of channels
                        return Channels.$loaded();
                    },
                    profile: function ($state, Auth, Users) {
                        //ensure the user has a displayName, otherwise send to the profile state.
                        //and if the user is not authenticated send to the home state.
                        return Auth.authRef.$waitForAuth().then(function (auth) {
                                if (auth) {//the user has been authenticated
                                    //console.log("entered .state('channel'), auth = " + auth);
                                    return Users.getProfile(auth.uid).$loaded().then(function (profile) {
                                            if (profile.displayName) {
                                                return profile;
                                            }
                                            //else $state.go('profile');
                                        }, function (error) {
                                            console.log("error getting profile:: " + error);
                                            //$state.go('home');
                                        }
                                    );
                                } else {
                                    return null;
                                }
                            },
                            function (error) {//if the user is not authenticated then authenticate anonymously
                                console.log("there was an error w/.$waitForAuth()");
                            }
                        );
                    }
                },
                templateUrl: 'channels/channels.html'
            })
            .state('channels.messages', {
                url: '/{channelId}/messages',
                templateUrl: 'channels/messages.html',
                controller: 'MessagesCtrl as messagesCtrl',
                resolve: {
                    //ensure the messages and channelName are available imm! upon entering this state
                    messages: function ($stateParams, Messages) {
                        return Messages.forChannel($stateParams.channelId).$loaded();
                    },
                    //this'll be what we use to display the channels' name in the messages pane
                    channelName: function ($stateParams, channels) {
                        return '#' + channels.$getRecord($stateParams.channelId).name;
                    }
                }
            })
            .state('channels.direct', {
                url: '/{uid}/messages/direct',
                templateUrl: 'channels/messages.html',
                controller: 'MessagesCtrl as messagesCtrl',
                resolve: {      //rem. profile is coming from the parent state 'channels'
                    messages: function ($stateParams, Messages, profile) {
                        return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
                    },
                    channelName: function ($stateParams, Users) {
                        return Users.all.$loaded().then(function () {
                            return '@' + Users.getDisplayName($stateParams.uid);
                        })
                    }
                }
            })
            .state('channels.create', {
                url: '/create',
                templateUrl: 'channels/create.html',
                controller: 'ChannelCtrl as channel'
            })
            .state('publisher_details', {
                url: '/{publisher}',
                controller: 'HomeController',
                templateUrl: 'core/views/template-publisher.html'
            })
            .state('indie_devs', {
                url: '/indie_devs/indie',
                controller: 'helloWorldController as hwCtrl',
                templateUrl: 'indiedev/indie_devs.html'
            })
            .state('indie_devs.posts', {
                url: '/indie_devs/indie/posts',
                templateUrl: 'posts/posts.html',
                controller: 'PostsController'
            })
            .state('indie_devs.posts_details', {
                url: '/indie_devs/indie/posts/{postId}',
                templateUrl: 'posts/showpost.html',
                controller: 'PostDetailsController'
            })
            .state('ninja_zone', {
                url: '/ninja_zone/enter',
                controller: 'AuthCtrl as auth',
                templateUrl: 'home/ninja_zone.html'
            })
            .state('post_register', {
                url: 'posts/register',
                templateUrl: 'posts/postregister.html',
                controller: 'PostAuthController',
                resolve: {
                    user: function (PostAuth) {
                        if(PostAuth.resolveUser()){
                            console.log("well it worked");
                            return PostAuth.resolveUser()
                        } else {
                            console.log("PostAuth.resolveUser() did NOT work");
                        }
                    }
                }
            })
            .state('post_login', {
                url: 'posts/login',
                templateUrl: 'posts/postsLogin.html'
            });

        $urlRouterProvider.otherwise('/');
    })
    .constant('FirebaseUrl', 'https://juliusproto.firebaseio.com/')
    .constant('FirepostUrl', 'https://ninjaposts.firebaseio.com/');
