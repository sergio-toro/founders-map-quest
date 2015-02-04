(function(){
    'use strict';

    var MainCtrl = function ($scope, $timeout, $filter, $routeParams, localStorageService) {
        var self = this;

        self.$scope              = $scope;
        self.$timeout            = $timeout;
        self.$filter             = $filter;
        self.$routeParams        = $routeParams;
        self.localStorageService = localStorageService;

        self.csvCacheId          = $routeParams.csvCacheId;
        self.data                = localStorageService.get($routeParams.csvCacheId);
        self.tab                 = 'map';
        self.map                 = null;

        self.currentPage         = 0;
        self.perPage             = 15;
        self.perPageOptions      = [ 15, 25, 50, 75, 100, 500 ];

        self.filteredData        = [];
        self.orderBy             = {
            field: 0,
            reverse: false
        };

        self.search              = null;
        self.searchBy            = null;
        self.searchByFields      = [
            { name: 'All fields', value: null }
        ];

        if (self.data!==null) {
            self.init();
        }
    };

    MainCtrl.prototype.init = function() {
        var self = this;

        angular.forEach(self.data.heading, function(row, key) {
            self.searchByFields.push({
                name: row,
                value: key
            });
        });

        self.$scope.$on('mapInitialized', function(event, evtMap) {
            self.map = evtMap;

            self.$scope.dynMarkers = [];
            angular.forEach(self.data.data, function(row) {

                var latLng = new window.google.maps.LatLng(
                    row[self.data.latFieldIndex],
                    row[self.data.lngFieldIndex]
                );
                self.$scope.dynMarkers.push(
                    new window.google.maps.Marker({
                        position: latLng,
                        title: (self.data.labelFieldIndex!==null ? row[self.data.labelFieldIndex] : '')
                    })
                );
            });

            self.$scope.markerClusterer = new window.MarkerClusterer(
                self.map,
                self.$scope.dynMarkers,
                {}
            );

            self.filterData();
        });

        self.$scope.$watch('ctrl.tab', function(tab){
            if (tab==='map') {
                self.$timeout(function(){
                    if (self.map && window.google && window.google.maps) {
                        window.google.maps.event.trigger(self.map, 'resize');
                    }
                }, 50);
            }
        });
    };

    MainCtrl.prototype.filterData = function() {
        var self = this;

        var filteredData = self.data.data;

        if (self.search) {
            if (self.searchBy!==null) {
                var search = self.search.toLocaleLowerCase();
                filteredData = self.$filter('filter')(
                    filteredData,
                    function filterFn(value, index) {
                        var text = ''+ value[self.searchBy] +'';
                        text = text.toLocaleLowerCase();
                        return text.contains(search);
                    }
                );
            }
            else {
                filteredData = self.$filter('filter')(
                    filteredData,
                    self.search
                );
            }
        }

        if (typeof self.orderBy.field!=='undefined') {
            filteredData = self.$filter('orderBy')(
                filteredData,
                self.orderBy.field,
                self.orderBy.reverse
            );
        }

        self.currentPage  = 0;
        self.filteredData = filteredData;
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
