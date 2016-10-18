'use strict';

/* Controllers */

var myControllers = angular.module('myControllers', []);

myControllers.controller("mapController", ['$scope', 'uiGmapGoogleMapApi', 'geolocation', '$q', function($scope, uiGmapGoogleMapApi, geolocation, $q) {
    $scope.getLocation = function() {
        $scope.map = {
            zoom: 9,
            options: {
                streetViewControl: false
            },
            clustererOptions: {
                imagePath: 'https://github.com/googlemaps/js-marker-clusterer/raw/gh-pages/images/m'
            }
        };
        $scope.map.center = {
            latitude: 49,
            longitude: 11
        }
        $q.all([uiGmapGoogleMapApi, geolocation.getLocation()])
            .then(function(data) {
                var browserGeoLoc = data[1];
                if (browserGeoLoc) {
                    $scope.map.center = {
                        latitude: browserGeoLoc.coords.latitude,
                        longitude: browserGeoLoc.coords.longitude
                    }
                } else {
                    new maps.Geocoder().geocode({
                            address: 'Austria'
                        },
                        function(results) {
                            $scope.map.center = {
                                latitude: results[0].geometry.location.lat(),
                                longitude: results[0].geometry.location.lng()
                            };
                        }
                    );
                }
            })
    };
    // Do stuff with your $scope.
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {
      
    });
}]);
