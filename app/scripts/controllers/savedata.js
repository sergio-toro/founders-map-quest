(function() {
    'use strict';

    var SavedataCtrl = function($scope, $location, $routeParams, localStorageService) {
        var self = this;

        self.$scope              = $scope;
        self.$routeParams        = $routeParams;
        self.$location           = $location;
        self.localStorageService = localStorageService;

        self.csvCacheId          = $routeParams.csvCacheId;

        self.data = localStorageService.get($routeParams.csvCacheId);
        self.data.name = null;

    };

    SavedataCtrl.prototype.goReviewFields = function(csvCacheId) {
        var self = this;

        self.$location.path('/review-fields/'+csvCacheId);
    };

    SavedataCtrl.prototype.saveData = function(csvCacheId) {
        var self = this;

        var savedData = self.localStorageService.get('saved-data');

        if (!savedData) {
            savedData = [];
        }

        savedData.push({
            name: self.data.name,
            csvCacheId: csvCacheId
        });

        self.localStorageService.set('saved-data', savedData);

        //self.$location.path('/review-fields/'+csvCacheId);
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