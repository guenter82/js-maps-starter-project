'use strict';

/* App Module */
var myApplicationModule = myApplicationModule || angular.module('myApplicationModule', [
      'uiGmapgoogle-maps',
      'myControllers'
  ]
);

myApplicationModule.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCbfQaCBu2uOqS49CHqIqhp4lZ1s_X3bFI',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})
