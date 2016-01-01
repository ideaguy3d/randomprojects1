angular.module('songhop.services', ['ionic.utils'])
    .factory('User', function ($http, SERVER) {
        var o = {
            username: false,
            session_id: false,
            favorites: [],
            newFavorites: 0
        };

        o.auth = function (username, signingup) {
            var authRoute;
            if(signingup){
                authRoute = "signup";
            }else {
                authRoute = "login";
            }
            return $http(SERVER.url+"/"+authRoute,
                {username: username});
        };

        o.addSongToFavorites = function (song) {
            if (!song) return false;

            //put song at the front of the array
            o.favorites.unshift(song);
            o.newFavorites++;
        };

        o.favoriteCount = function () {
            return o.newFavorites;
        };

        //the reason we grab the song is because in the future we'll be grabbing the song from a server using the song id
        o.removeSongFromFavorites = function (song, index) {
            if (!song) return false;
            o.favorites.splice(index, 1);
        };

        return o;
    })
    .factory('Recommendations', ['$http', 'SERVER', '$q',
        function ($http, SERVER, $q) {
            var o = {
                queue: []
            };
            var media;

            //in case the use refreshes for some reason. There won't be any songs in the queue
            //to play if refreshed
            o.init = function () {
                if(o.queue.length === 0){
                    return o.getNextSongs();
                } else {
                    return o.playCurrentSong();
                }
            };

            //heavy use of the $q service in this method
            o.playCurrentSong = function () {
                var defer = $q.defer();
                media = new Audio(o.queue[0].preview_url);
                media.addEventListener("loadeddata", function () {
                    //this will let anyone waiting for this promise to be resolved know that it's ready to go
                    defer.resolve();
                });
                media.play();
                return defer.promise;
            };

            o.haltAudio = function () {
                if(media) media.pause();
            };

            /**
             * keep in mind our data looks like this:
             *
             {
                 "title":"Blood Brothers",
                 "artist":"Luke Bryan",
                 "preview_url":"https://p.scdn.co/mp3-preview/b92a1dc3c0420d8c6fe1bab6ae15c181bf63926d",
                 "image_small":"https://i.scdn.co/image/082645c420a3ea4fb58a2b325c191df1a19cc8c7",
                 "image_medium":"https://i.scdn.co/image/beac04c66c73fdb1765ba645bcad6a73e5e9ba90",
                 "image_large":"https://i.scdn.co/image/ca93252350b8819ac51252783e1431af9dabd59f",
                 "open_url":"https://open.spotify.com/track/4ggPIxXwOWReIBfyCVW8QI",
                 "song_id":"54d3f75eb9fd644f061b3c40"
             }
             * */
            o.getNextSongs = function () {
                return $http({
                    method: 'GET',
                    url: SERVER.url + '/recommendations'
                }).success(function (data) {
                    o.queue = o.queue.concat(data);
                });
            };

            o.nextSong = function () {
                o.queue.shift();
                o.haltAudio();
                //check to make sure there are at least 3 songs in the server,
                //if not request more from the server
                if (o.queue.length <= 3) {
                    o.getNextSongs();
                }
            };

            return o;
        }
    ]);
