(function(){
    'use strict';

    var MainCtrl = function ($scope, $location, $timeout, $filter, $routeParams, CsvStorage) {
        var self = this;

        self.$scope         = $scope;
        self.$location      = $location;
        self.$timeout       = $timeout;
        self.$filter        = $filter;
        self.$routeParams   = $routeParams;
        self.CsvStorage     = CsvStorage;

        self.csvCacheId     = $routeParams.csvCacheId;
        self.data           = CsvStorage.getCsv($routeParams.csvCacheId);
        self.tab            = 'map';
        self.map            = null;

        self.currentPage    = 0;
        self.perPage        = 15;
        self.perPageOptions = [ 15, 25, 50, 75, 100, 500 ];

        self.filteredData   = [];
        self.orderBy        = {
            field: 0,
            reverse: false
        };

        self.search         = null;
        self.searchBy       = null;
        self.searchByFields = [
            { name: 'All fields', value: null }
        ];

        if (self.data) {
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

            self.drawMapMarkers();

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

    MainCtrl.prototype.toggleVisibility = function(row) {
        var self = this;

        if (row[self.data.hideFieldIndex]) {
            row[self.data.hideFieldIndex] = false;
        }
        else {
            row[self.data.hideFieldIndex] = true;
        }

        self.clearMapMarkers();

        self.drawMapMarkers();
    };

    MainCtrl.prototype.clearMapMarkers = function() {
        var self = this;

        if (typeof self.markerClusterer==='object') {
            self.markerClusterer.clearMarkers();
        }
    };

    MainCtrl.prototype.drawMapMarkers = function() {
        var self = this;

        self.dynMarkers = [];
        angular.forEach(self.data.data, function(row) {

            // Check if marker is hidden
            if (row[self.data.hideFieldIndex]) {
                return;
            }

            var latLng = new window.google.maps.LatLng(
                row[self.data.latFieldIndex],
                row[self.data.lngFieldIndex]
            );
            self.dynMarkers.push(
                new window.google.maps.Marker({
                    position: latLng,
                    title: (self.data.labelFieldIndex!==null ? row[self.data.labelFieldIndex] : '')
                })
            );
        });

        self.markerClusterer = new window.MarkerClusterer(
            self.map,
            self.dynMarkers,
            {}
        );
    };

    MainCtrl.prototype.filterData = function() {
        var self = this;

        var filteredData = self.data.data;

        if (self.search) {
            if (self.searchBy!==null) {
                var search = self.search.toLocaleLowerCase();
                filteredData = self.$filter('filter')(
                    filteredData,
                    function filterFn(value) {
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

    MainCtrl.prototype.deleteStoredCsv = function(csvCacheId) {
        var self = this;

        self.CsvStorage.removeCsv(csvCacheId);

        self.$location.path('/');
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
