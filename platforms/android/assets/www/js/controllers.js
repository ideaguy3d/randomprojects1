angular.module('songhop.controllers', ['ionic', 'songhop.services'])
    .controller('DiscoverCtrl', function ($scope, $timeout, User, Recommendations, $ionicLoading) {
        //we're using variables rather than $scope here
        var showLoading = function () {
            $ionicLoading.show({
                template: 'Julius <i class="ion-loading-c"></i> | <h1>App</h1>',
                noBackdrop: false
            });
        };
        var hideLoading = function () {
            $ionicLoading.hide();
        };

        //during ng run time invoke this
        showLoading();

        //invoke this imm! at runtime
        Recommendations.init().then(function () {
            $scope.currentSong = Recommendations.queue[0];
            //return this once it finishes resolving
            Recommendations.playCurrentSong();
        }).then(function () {
            hideLoading();
            console.log("NO return keyword");
            $scope.currentSong.loaded = true;
        });

        $scope.sendFeedback = function (bool) {
            //... note:             we are writing to our service here (:
            if (bool) User.addSongToFavorites($scope.currentSong);
            //set variable for correct animation sequence
            $scope.currentSong.rated = bool;
            $scope.currentSong.hide = true;

            //prepare the next song
            Recommendations.nextSong();

            //timeout for anim to complete, then update current song in scope
            $timeout(function () {
                $scope.currentSong = Recommendations.queue[0];
                $scope.currentSong.loaded = false;
            }, 250);

            Recommendations.playCurrentSong().then(function () {
                //now that Recommendations.playCurrentSong has resolved
                $scope.currentSong.loaded = true;
            });
        };

        $scope.nextAlbumImg = function () {
            //get the next img in the queue so it can be cached by the browser. The css will make img 1x1 px w/opacity:0.01
            if (Recommendations.queue.length > 1) {
                return Recommendations.queue[1].image_large;
            }
            return '';
        }

    })
    .controller('FavoritesCtrl', function ($scope, User, $window) {
        $scope.favorites = User.favorites;

        $scope.removeSong = function (song, index) {
            User.removeSongFromFavorites(song, index);
        };

        $scope.openSong = function (song) {
            //'_system' tells cordova to open the mobile devices system browser, e.g. chrome or safari
            $window.open(song.open_url, "_system");
        };
    })
    .controller('TabsCtrl', function ($scope, Recommendations, User) {//tabs control is the parent of Discover&Favorites
        $scope.enteringFavorites = function () {
            Recommendations.haltAudio();
            //we're writing to our service
            User.newFavorites = 0;
        };

        $scope.leavingFavorites = function () {
            Recommendations.init();
        };

        $scope.favCount = User.favoriteCount;
    })
    .controller('SplashCtrl', function ($scope, $state, User) {
        $state.submitForm = function (username, signup) {
            User.auth(username, signup).then(function () {
                //session is now set, so lets redirect to the discover page
                $state.go('tab.discover');
            }, function () {
                alert('Error. Wrong username');
            })
        }
    });


/**
 * $scope.songs = [
 {
     "title": "Stealing Cinderella",
     "artist": "Chuck Wicks",
     "image_small": "https://i.scdn.co/image/d1f58701179fe768cff26a77a46c56f291343d68",
     "image_large": "https://i.scdn.co/image/9ce5ea93acd3048312978d1eb5f6d297ff93375d"
 },
 {
     "title": "Venom - Original Mix",
     "artist": "Ziggy",
     "image_small": "https://i.scdn.co/image/1a4ba26961c4606c316e10d5d3d20b736e3e7d27",
     "image_large": "https://i.scdn.co/image/91a396948e8fc2cf170c781c93dd08b866812f3a"
 },
 {
     "title": "Do It",
     "artist": "Rootkit",
     "image_small": "https://i.scdn.co/image/398df9a33a6019c0e95e3be05fbaf19be0e91138",
     "image_large": "https://i.scdn.co/image/4e47ee3f6214fabbbed2092a21e62ee2a830058a"
 }
 ];
 //we don't want a direct ref to the obj, so just create a copy of it.
 $scope.currentSong = angular.copy($scope.songs[0]);
 * */