(function(){

    'use strict';

    var LoadDataCtrl = function($scope, $location, CsvParser, localStorageService) {
        var self = this;

        self.$scope              = $scope;
        self.$location           = $location;
        self.CsvParser           = CsvParser;
        self.localStorageService = localStorageService;

        self.delimiter       = ',';
        self.fieldDelimiters = [
            { name: ',',   value: ',' },
            { name: ';',   value: ';' },
            { name: 'tab', value: '\t' },
        ];
    };

    LoadDataCtrl.prototype.generateUniqId = function() {
        return (new Date().getTime()).toString(16);
    };

    LoadDataCtrl.prototype.goReviewFields = function(csvCacheId) {
        var self = this;

        self.$location.path('/review-fields/'+csvCacheId);
    };

    LoadDataCtrl.prototype.parseCsv = function() {
        var self = this;

        self.data       = self.CsvParser.parse(self.csvData, self.delimiter);
        self.csvCacheId = self.generateUniqId();

        // Store in localStorage for next route
        self.localStorageService.set(self.csvCacheId, self.data);
    };

    LoadDataCtrl.prototype.loadCSVFile = function(csvFile) {
        var self = this;

        // define reader
        var reader = new FileReader();

        // A handler for the load event (just defining it, not executing it right now)
        reader.onload = function() {
            self.$scope.$apply(function() {
                self.csvData = reader.result;

                self.parseCsv();
            });
        };

        // use reader to read the selected file
        // when read operation is successfully finished the load event is triggered
        // and handled by our reader.onload function
        reader.readAsText(csvFile);
    };

    /**
     * @ngdoc function
     * @name foundersMapQuestApp.controller:LoadDataCtrl
     * @description
     * # LoadDataCtrl
     * Controller of the foundersMapQuestApp
     */
    angular.module('foundersMapQuestApp')
        .controller('LoadDataCtrl', LoadDataCtrl);
})();
