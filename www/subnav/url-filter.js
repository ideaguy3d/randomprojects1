/**
 * Created by Julius Hernandez on 10/16/2015.
 */
"use strict";

angular.module('ngfireApp').filter('hostnameFromUrl', function () {
   return function (str) {
       //console.log("hostnameFromUrl str = "+str);
       var url = document.createElement('a');
       url.href = str;
       return url.hostname;
   }
});