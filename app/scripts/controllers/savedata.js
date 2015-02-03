(function() {
    'use strict';

    var SavedataCtrl = function($scope, $q, $location, $routeParams, localStorageService, GeoCoder) {
        var self = this;

        self.$scope              = $scope;
        self.$routeParams        = $routeParams;
        self.$location           = $location;
        self.$q                  = $q;
        self.GeoCoder            = GeoCoder;
        self.localStorageService = localStorageService;

        self.csvCacheId          = $routeParams.csvCacheId;

        self.data = localStorageService.get($routeParams.csvCacheId);
        self.data.name = null;
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
                        console.log(result[0]);
                        row.push(result[0].geometry.location.lat());
                        row.push(result[0].geometry.location.lng());

                        defer.resolve()
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

    SavedataCtrl.prototype.updateSavedData = function(csvCacheId) {
        var self = this;

        var savedData = self.localStorageService.get('saved-data');

        if (!savedData) {
            savedData = [];
        }

        // check if it's already saved
        var isNew = true;
        for (var i = savedData.length - 1; i >= 0; i--) {
            if (savedData[i].csvCacheId===csvCacheId && self.data.name) {
                savedData[i].name = self.data.name;
                isNew = false;
                break;
            }
        }

        // Check new saved item
        if (isNew && self.data.name && csvCacheId) {
            savedData.push({
                name: self.data.name,
                csvCacheId: csvCacheId
            });
        }
        self.localStorageService.set('saved-data', savedData);

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

                        // Save updated csv content
                        self.localStorageService.set(csvCacheId, self.data);

                        self.updateSavedData(csvCacheId);
                        self.$location.path('/map/'+csvCacheId);
                    },
                    function onError(){
                        self.geoLocateLoading = false;
                    }
                )
            ;
        }
        else {
            // Save updated csv content
            self.localStorageService.set(csvCacheId, self.data);

            // Save updated data
            self.updateSavedData(csvCacheId);
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