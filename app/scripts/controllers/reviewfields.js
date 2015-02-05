(function(){

    'use strict';

    var ReviewfieldsCtrl = function($scope, $location, $routeParams, CsvStorage) {
        var self = this;

        self.$scope                  = $scope;
        self.$routeParams            = $routeParams;
        self.$location               = $location;
        self.CsvStorage              = CsvStorage;

        self.error                   = null;
        self.question                = 'is-there-latLng';
        self.csvCacheId              = null;

        self.data                    = CsvStorage.getCsv($routeParams.csvCacheId) || {};
        self.data.latFieldIndex      = null;
        self.data.lngFieldIndex      = null;
        self.data.addressFieldsIndex = null;
        self.data.labelFieldIndex    = null;
    };

    ReviewfieldsCtrl.prototype.goSaveData = function(csvCacheId) {
        var self = this;

        if ( (self.data.latFieldIndex!==null && self.data.lngFieldIndex!==null) ||
            self.data.addressFieldsIndex!==null ) {
            self.$location.path('/save-data/'+csvCacheId);
        }
    };

    ReviewfieldsCtrl.prototype.setQuestion = function(question) {
        var self = this;

        self.error    = null;
        self.question = question;

        if (question==='review-fields') {
            self.csvCacheId = self.$routeParams.csvCacheId;
            self.CsvStorage.storeTempCsv(
                self.$routeParams.csvCacheId,
                self.data
            );
        }
    };

    ReviewfieldsCtrl.prototype.setLatitude = function($index) {
        var self = this;

        self.data.latFieldIndex = $index;
        self.setQuestion('where-is-longitude');
    };

    ReviewfieldsCtrl.prototype.setLongitude = function($index) {
        var self = this;

        self.data.lngFieldIndex = $index;
        self.setQuestion('is-there-label');
    };

    ReviewfieldsCtrl.prototype.setAddressField = function($index) {
        var self = this;

        if (self.data.addressFieldsIndex===null) {
            self.data.addressFieldsIndex = [];
        }

        if (!self.isAddressField($index)) {
            self.data.addressFieldsIndex.push($index);
        }
        else {
            // Remove item from selected list
            self.data.addressFieldsIndex.splice(
                self.data.addressFieldsIndex.indexOf($index),
                1
            );
        }
    };

    ReviewfieldsCtrl.prototype.isAddressField = function($index) {
        var self = this;

        if (self.data.addressFieldsIndex!==null) {
            if (-1!==self.data.addressFieldsIndex.indexOf($index)) {
                return true;
            }
        }

        return false;
    };

    ReviewfieldsCtrl.prototype.setLabel = function($index) {
        var self = this;

        self.data.labelFieldIndex = $index;
        self.setQuestion('review-fields');
    };

    ReviewfieldsCtrl.prototype.restart = function() {
        var self = this;

        self.data.latFieldIndex      = null;
        self.data.lngFieldIndex      = null;
        self.data.addressFieldsIndex = null;
        self.data.labelFieldIndex    = null;

        self.csvCacheId = null;

        self.setQuestion('is-there-latLng');
    };

    /**
     * @ngdoc function
     * @name foundersMapQuestApp.controller:ReviewfieldsCtrl
     * @description
     * # ReviewfieldsCtrl
     * Controller of the foundersMapQuestApp
     */
    angular.module('foundersMapQuestApp')
        .controller('ReviewfieldsCtrl', ReviewfieldsCtrl);
})();