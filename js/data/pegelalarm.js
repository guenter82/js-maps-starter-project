var PegelAlarm = PegelAlarm || angular.module('PegelAlarm', []);

PegelAlarm.factory("PegelAlarmService", function($http) {
    var me = {
      getWaterLevels : function(successHandler, errorHandler) {
        $http({
            method: 'GET',
            url: 'http://api.pegelalarm.at/api/station/1.0/list?countryCode=at&responseDetailLevel=high'
        }).then(function successCallback(response) {
            if (successHandler) successHandler(response);
            if (DEBUG) console.log(response.data);
        }, function errorCallback(response) {
            if (errorHandler) errorHandler(response);
            if (DEBUG) console.log(response.status +"\n"+ response.data);
        });
      },
      otherFunction : function () {
        if (DEBUG) alert("Other function");
      }
    };
    return me;
});
