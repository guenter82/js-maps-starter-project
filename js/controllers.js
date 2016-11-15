'use strict';

/* Controllers */

var myControllers = angular.module('myControllers', []);

myControllers.controller("alertController", ['$rootScope', '$scope', function($rootScope, $scope) {
    $rootScope.alerts = [];
    $scope.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
    };
}]);

myControllers.controller("navController", ['$scope', '$location', function($scope, $location) {
    $scope.navClass = function(page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };

    $scope.loadHome = function() {
        $location.url('/home');
    };

    $scope.loadContact = function() {
        $location.url('/contact');
    };

}]);

myControllers.controller("mapController", ['$scope', 'uiGmapGoogleMapApi', 'geolocation', '$q', function($scope, uiGmapGoogleMapApi, geolocation, $q) {
    $scope.doSomethingWithMarker = function(markerWindow) {
        console.log("Marker - Window: " + markerWindow);
        markerWindow.doSomethingWithMarker();
    };
    $scope.map = {
        zoom: 12,
        options: {
            streetViewControl: false,
            scrollwheel: false
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
                pixelOffset: {
                    height: -40,
                    width: 0
                }
            },
            parent: $scope
        }
    };
    var imageIconGreen = {
      url: 'image/icon_green.png'
    };

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
                var myMarker = {
                    id: $scope.markers.length+1,
                    station: 'My Position',
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    icon: imageIconGreen
                };
                $scope.markers.push(myMarker);
                var alert = {
                    type: 'success',
                    msg: 'Your position: ' + position.coords.latitude + ', ' + position.coords.longitude
                };
                console.log(alert.msg);
                $scope.alerts.push(alert);
            }, function() {
                var alert = {
                    type: 'danger',
                    msg: 'Geolocation Service failed, because\nbrowser location function return error.'
                };
                console.log(alert.msg);
                $scope.alerts.push(alert);
            });
        } else {
            var alert = {
                type: 'danger',
                msg: 'Geolocation Service failed, because\nyour browser doesn\'t support geolocation.'
            };
            console.log(alert.msg);
            $scope.alerts.push(alert);
        }
    };

    var marker1 = {
        id: 1,
        station: 'First Marker',
        coords: {
            latitude: 48.3,
            longitude: 14.25
        }
    };
    var marker2 = {
        id: 2,
        station: 'Second Marker',
        coords: {
            latitude: 48.3,
            longitude: 14.2
        }
    };
    $scope.markers = [marker1, marker2];
    

    uiGmapGoogleMapApi.then(function(maps) {
        //TODO when map with markers is loaded
    });
}]);
