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


myControllers.controller("mapController", ['$scope', 'uiGmapGoogleMapApi', 'geolocation', '$q' , 'PegelAlarmService',
  function($scope, uiGmapGoogleMapApi, geolocation, $q, PegelAlarmService) {
    $scope.doSomethingWithMarker = function(markerWindow) {
        console.log("Marker - Window: " + markerWindow);
        markerWindow.doSomethingWithMarker();
    };
    $scope.map = {
        zoom: 8,
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
                console.log("doSomethingWithMarker");
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
    };


    var handleWaterLevels = function(response) {
      if (DEBUG) console.log("handleWaterLevels: " + response.data);
      var stations = response.data.payload.stations;
      for (var i=0; i<stations.length; i++) {
        var s = stations[i];
        var m = {
          id: i+1,
          station: s.stationName,
          coords: {
            latitude: s.latitude,
            longitude: s.longitude
          },
          data: s
        }
        $scope.markers.push(m);
      }
      if (DEBUG) console.log("New Markers: " + $scope.markers.length);
    //  $scope.$apply();
    };

    $scope.markers = [];
    PegelAlarmService.getWaterLevels(handleWaterLevels);
    uiGmapGoogleMapApi.then(function(maps) {
        //TODO when map with markers is loaded
    });
}]);
