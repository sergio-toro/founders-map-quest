(function(){
    'use strict';

    var MainCtrl = function ($scope, $timeout, $routeParams, localStorageService) {
        var self = this;

        self.$scope              = $scope;
        self.$timeout            = $timeout;
        self.$routeParams        = $routeParams;
        self.localStorageService = localStorageService;

        self.csvCacheId = $routeParams.csvCacheId;
        self.data       = localStorageService.get($routeParams.csvCacheId);
        self.tab        = 'map';
        self.map        = null;

        if (self.data!==null) {
            self.init();
        }
    };

    MainCtrl.prototype.init = function() {
        var self = this;

        self.$scope.$on('mapInitialized', function(event, evtMap) {
            var geocoder = new google.maps.Geocoder();
            self.map = evtMap;

            self.$scope.dynMarkers = [];
            angular.forEach(self.data.data, function(row) {

                var latLng = new google.maps.LatLng(
                    row[self.data.latFieldIndex],
                    row[self.data.lngFieldIndex]
                );
                self.$scope.dynMarkers.push(
                    new google.maps.Marker({
                        position: latLng,
                        title: (self.data.labelFieldIndex!==null ? row[self.data.labelFieldIndex] : '')
                    })
                );
            });

            self.$scope.markerClusterer = new MarkerClusterer(
                self.map,
                self.$scope.dynMarkers,
                {}
            );
        });

        self.$scope.$watch('ctrl.tab', function(tab){
            if (tab=='map') {
                self.$timeout(function(){
                    if (self.map && window.google && google.maps) {
                        google.maps.event.trigger(self.map, 'resize');
                    }
                }, 50);
            }
        });
    };

    /**
     * @ngdoc function
     * @name foundersMapQuestApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the foundersMapQuestApp
     */
    angular.module('foundersMapQuestApp')
        .controller('MainCtrl', MainCtrl)
    ;

})();
