'use strict';
var DEBUG = true;

/* App Module */
var myApplicationModule = myApplicationModule || angular.module('myApplicationModule', [
    'uiGmapgoogle-maps',
    'geolocation',
    'ngRoute',
    'ui.bootstrap',
    'PegelAlarm',
    'myControllers'
]);

myApplicationModule.config(function ($routeProvider) {
    $routeProvider.when('/home',
    {
      templateUrl:    'view/home.html',
    });

    $routeProvider.when('/contact',
    {
      templateUrl:    'view/contact.html',
    });
    $routeProvider.otherwise(
    {
      redirectTo:     '/home'
    });
});
myApplicationModule.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCbfQaCBu2uOqS49CHqIqhp4lZ1s_X3bFI',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});

// myApplicationModule.directive('contentfill', function ($window) {
//     return {
//         restrict: 'A',
//         link: function (scope, elem, attrs) {
//             var winHeight = $window.innerHeight;
//             var otherElements = 170 + 30;
//             elem.css('height', winHeight - otherElements + 'px');
//         }
//     };
// });
