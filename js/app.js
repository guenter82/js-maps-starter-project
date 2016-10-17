'use strict';

/* App Module */
var myApplicationModule = myApplicationModule || angular.module('myApplicationModule', [
      'uiGmapgoogle-maps'
  ]
);

myApplicationModule.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})
