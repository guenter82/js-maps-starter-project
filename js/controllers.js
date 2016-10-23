'use strict';

/* Controllers */

var myControllers = angular.module('myControllers', []);   

myControllers.controller("mapController", ['$scope', 'uiGmapGoogleMapApi', 'geolocation', '$q', function($scope, uiGmapGoogleMapApi, geolocation, $q) {
    $scope.doSomethingWithMarker = function(markerWindow) {
      console.log("Marker - Window: " + markerWindow);
      markerWindow.doSomethingWithMarker();
    };
    $scope.mapWarning = {
      title = 'No warning',
      text = 'no warning'
    }
    $scope.map = {
        zoom: 12,
        options: {
            streetViewControl: false
        },
        clustererOptions: {
            imagePath: 'https://github.com/googlemaps/js-marker-clusterer/raw/gh-pages/images/m'
        },
        markersEvents: {
            click: function(mapMarker, eventName, marker) {
                if ($scope.map.window.marker != marker) {
                    $scope.map.window.marker = marker;
                    $scope.map.window.options.visible = true;
                }
              // toggle show/hide
                else {
                    $scope.map.window.options.visible = !$scope.map.window.options.visible;
                }
            }
        },
        window: {
            marker: {},
            closeClick: function() {
                $scope.map.window.options.visible = false;
            },
            doSomethingWithMarker: function() {
                //do something
                console.log("Marker: " + this.marker.station);
                this.closeClick();
            },
            options: {
                visible: false,
                maxWidth: 350,
                pixelOffset: {height: -40, width: 0}
            },
            parent: $scope
        }
    };
    //TODO create and use infoWindow for failure
    $scope.getLocation = function() {
        var pos = {
            latitude: 48.3,
            longitude: 14.3
        };
        $scope.map.center = pos;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                pos.latitude = position.coords.latitude;
                pos.longitude = position.coords.longitude;
            }, function() {
                // handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            mapWarning.title = 'Geolocation Service failed';
            mapWarning.text = 'Geolocation Service failed'
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            mapWarning.title =
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }
    };

    var marker1 = {
       id: 1,
      station: 'First Marker',
      coords: {latitude: 48.3, longitude: 14.4}
    };
    var marker2 = {
      id: 2,
      station: 'Second Marker',
      coords: {latitude: 48.3, longitude: 14.2}
    };
    $scope.markers = [marker1, marker2];

    uiGmapGoogleMapApi.then(function(maps) {
      //TODO when map with markers is loaded
    });
}]);
