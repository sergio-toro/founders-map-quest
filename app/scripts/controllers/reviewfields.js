(function(){

    'use strict';

    var ReviewfieldsCtrl = function($scope, $routeParams, localStorageService) {
        var self = this;

        self.$scope              = $scope;
        self.localStorageService = localStorageService;

        self.error    = null;
        self.question = 'is-there-latLng';

        self.data = localStorageService.get($routeParams.csvCacheId);

    };

    ReviewfieldsCtrl.prototype.setQuestion = function(question) {
        var self = this;

        self.error    = null;
        self.question = question;
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