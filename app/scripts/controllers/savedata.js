(function() {
    'use strict';

    var SavedataCtrl = function($scope, $q, $location, $routeParams, CsvStorage, GeoCoder) {
        var self = this;

        self.$scope              = $scope;
        self.$routeParams        = $routeParams;
        self.$location           = $location;
        self.$q                  = $q;
        self.GeoCoder            = GeoCoder;
        self.CsvStorage          = CsvStorage;

        self.csvCacheId          = $routeParams.csvCacheId;

        self.data                = CsvStorage.getCsv($routeParams.csvCacheId);
        self.data.name           = self.data.name || null;
        self.data.hideFieldIndex = null;
    };

    SavedataCtrl.prototype.goReviewFields = function(csvCacheId) {
        var self = this;

        self.$location.path('/review-fields/'+csvCacheId);
    };


    SavedataCtrl.prototype.geoCodeResults = function() {
        var self = this;
        var geolocationPromises = [];

        angular.forEach(self.data.data, function(row) {

            // make address string
            var address = '';
            angular.forEach(self.data.addressFieldsIndex, function(index) {
                address += row[index] + ' ';
            });

            // Geolocate result
            var defer = self.$q.defer();
            self.GeoCoder.geocode({ address: address })
                .then(
                    function onSuccess(result) {
                        row.push(result[0].geometry.location.lat());
                        row.push(result[0].geometry.location.lng());

                        defer.resolve();
                    },
                    function onError() {
                        defer.resolve('There was an error geolocating address `'+address+'`');
                    }
                )
            ;
            geolocationPromises.push(defer.promise);
        });

        return self.$q.all(geolocationPromises);
    };

    SavedataCtrl.prototype.saveData = function(csvCacheId) {
        var self = this;

        // If user has set geolocation by address
        if (self.data.addressFieldsIndex!==null) {
            self.geoLocateLoading = true;

            self.geoCodeResults()
                .then(
                    function onSuccess(){
                        self.geoLocateLoading = false;

                        // Update wich fields contains lat, lng
                        self.data.latFieldIndex  = self.data.heading.length;
                        self.data.lngFieldIndex  = self.data.latFieldIndex+1;
                        self.data.hideFieldIndex = self.data.lngFieldIndex+1;

                        // Save updated csv content
                        self.CsvStorage.storeCsv(csvCacheId, self.data);

                        self.$location.path('/map/'+csvCacheId);
                    },
                    function onError(){
                        self.geoLocateLoading = false;
                    }
                )
            ;
        }
        else {
            self.data.hideFieldIndex = self.data.heading.length;

            // Save updated csv content
            self.CsvStorage.storeCsv(csvCacheId, self.data);

            self.$location.path('/map/'+csvCacheId);
        }
    };

    /**
     * @ngdoc function
     * @name foundersMapQuestApp.controller:SavedataCtrl
     * @description
     * # SavedataCtrl
     * Controller of the foundersMapQuestApp
     */
    angular.module('foundersMapQuestApp')
        .controller('SavedataCtrl', SavedataCtrl);
})();