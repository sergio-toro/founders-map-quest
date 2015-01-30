(function(){

    'use strict';

    var ReviewfieldsCtrl = function($scope, $location, $routeParams, localStorageService) {
        var self = this;

        self.$scope              = $scope;
        self.$routeParams        = $routeParams;
        self.$location           = $location;
        self.localStorageService = localStorageService;

        self.error      = null;
        self.question   = 'is-there-latLng';
        self.csvCacheId = null;

        self.data = localStorageService.get($routeParams.csvCacheId);
        self.data.latFieldIndex     = null;
        self.data.lngFieldIndex     = null;
        self.data.addressFieldIndex = null;
        self.data.labelFieldIndex   = null;
    };

    ReviewfieldsCtrl.prototype.goSaveData = function(csvCacheId) {
        var self = this;

        self.$location.path('/save-data/'+csvCacheId);
    };

    ReviewfieldsCtrl.prototype.setQuestion = function(question) {
        var self = this;

        self.error    = null;
        self.question = question;

        if (question==='review-fields') {
            self.localStorageService.set(self.$routeParams.csvCacheId, self.data)
            self.csvCacheId = self.$routeParams.csvCacheId;
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

    ReviewfieldsCtrl.prototype.setLabel = function($index) {
        var self = this;

        self.data.labelFieldIndex = $index;
        self.setQuestion('review-fields');
    };

    ReviewfieldsCtrl.prototype.restart = function() {
        var self = this;

        self.data.latFieldIndex     = null;
        self.data.lngFieldIndex     = null;
        self.data.addressFieldIndex = null;
        self.data.labelFieldIndex   = null;

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